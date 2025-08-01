/**
 * Enhanced Text Organization Service with Progress Tracking
 * Uses Server-Sent Events (SSE) to provide real-time progress updates
 */

const EventEmitter = require('events');

class TextOrganizationProgressService extends EventEmitter {
    constructor() {
        super();
        this.activeProcesses = new Map();
        this.processCounter = 0;
    }

    /**
     * ארגון טקסט עם מעקב התקדמות מלא
     */
    async organizeTextWithProgress(text, prompt, model, apiKey, processId = null, disableItalicFormatting = false) {
        if (!processId) {
            processId = `process_${++this.processCounter}_${Date.now()}`;
        }

        const lines = text.split('\n');
        const textLength = lines.length;
        
        // הגדרת שלבי העיבוד
        const steps = this.defineProcessingSteps(textLength);
        
        const processInfo = {
            id: processId,
            startTime: Date.now(),
            textLength,
            model,
            steps,
            currentStep: 0,
            completedSteps: 0,
            status: 'initializing',
            estimatedDuration: this.estimateProcessingTime(textLength, model)
        };
        
        this.activeProcesses.set(processId, processInfo);

        try {
            // שלב 1: הכנה וניתוח ראשוני
            await this.executeStep(processId, 0, async () => {
                await this.delay(500); // סימולציה של ניתוח
                return this.analyzeTextStructure(text);
            });

            // שלב 2: יצירת prompt מותאם
            const optimizedPrompt = await this.executeStep(processId, 1, async () => {
                return this.createOptimizedPrompt(text, prompt, textLength, disableItalicFormatting);
            });

            // שלב 3: קריאה ל-API
            const organizedText = await this.executeStep(processId, 2, async () => {
                return this.callAIForOrganization(text, optimizedPrompt, model, apiKey, processId);
            });

            // שלב 4: עיבוד תוצאות
            const finalText = await this.executeStep(processId, 3, async () => {
                return this.postProcessText(organizedText);
            });

            // שלב 5: אימות איכות
            await this.executeStep(processId, 4, async () => {
                await this.validateTextQuality(text, finalText);
                await this.delay(300);
            });

            // השלמת העיבוד
            processInfo.status = 'completed';
            processInfo.completedSteps = steps.length;
            processInfo.endTime = Date.now();
            processInfo.duration = processInfo.endTime - processInfo.startTime;
            processInfo.result = finalText;
            processInfo.processInfo = {
                duration: processInfo.duration,
                stepsCompleted: processInfo.completedSteps,
                linesProcessed: textLength
            };
            
            this.emit('progress', processId, processInfo);
            this.emit('completed', processId, {
                organizedText: finalText,
                processInfo: processInfo.processInfo
            });
            
            return {
                organizedText: finalText,
                processInfo: {
                    duration: processInfo.duration,
                    stepsCompleted: processInfo.completedSteps,
                    linesProcessed: textLength
                }
            };

        } catch (error) {
            processInfo.status = 'error';
            processInfo.error = error.message;
            this.emit('error', processId, error);
            throw error;
        } finally {
            // ניקוי אחרי 5 דקות
            setTimeout(() => {
                this.activeProcesses.delete(processId);
            }, 5 * 60 * 1000);
        }
    }

    /**
     * הגדרת שלבי העיבוד בהתאם לגודל הטקסט
     */
    defineProcessingSteps(textLength) {
        const baseSteps = [
            {
                title: 'הכנה וניתוח ראשוני',
                description: 'ניתוח מבנה הטקסט וזיהוי דפוסים',
                subSteps: [
                    'זיהוי כותרות קיימות',
                    'ניתוח מבנה פסקאות',
                    'זיהוי רשימות ואלמנטים מיוחדים'
                ]
            },
            {
                title: 'יצירת אסטרטגיית ארגון',
                description: 'יצירת prompt מותאם לטקסט הספציפי',
                subSteps: [
                    'בחירת היררכיית כותרות מתאימה',
                    'הגדרת עומק הארגון',
                    'התאמת פרמטרים למודל AI'
                ]
            },
            {
                title: 'עיבוד בבינה מלאכותית',
                description: 'שליחה לבינה מלאכותית לארגון',
                subSteps: [
                    'שליחת הטקסט למודל',
                    'קבלת התגובה',
                    'ניתוח ראשוני של התוצאה'
                ]
            },
            {
                title: 'עיבוד ושיפור תוצאות',
                description: 'ניקוי ושיפור הטקסט המאורגן',
                subSteps: [
                    'ניקוי תגיות מיותרות',
                    'תיקון פורמט Markdown',
                    'איחוד שורות ריקות מיותרות'
                ]
            },
            {
                title: 'אימות איכות וסיום',
                description: 'בדיקת איכות התוצאה הסופית',
                subSteps: [
                    'אימות שלמות התוכן',
                    'בדיקת תקינות הפורמט',
                    'הכנה להחזרה'
                ]
            }
        ];

        // הוספת שלבים נוספים לטקסטים גדולים
        if (textLength > 200) {
            baseSteps.splice(2, 0, {
                title: 'חלוקה לקטעים',
                description: 'חלוקת טקסט גדול לקטעים לעיבוד מיטבי',
                subSteps: [
                    'זיהוי נקודות חלוקה טבעיות',
                    'חלוקה לקטעים מאוזנים',
                    'שמירת הקשר בין קטעים'
                ]
            });
        }

        return baseSteps;
    }

    /**
     * הערכת זמן עיבוד
     */
    estimateProcessingTime(textLength, model) {
        // הערכה בסיסית בהתבסס על גודל הטקסט ומודל
        let baseTime = 3000; // 3 שניות בסיס
        
        if (textLength > 100) baseTime += (textLength - 100) * 50; // 50ms לכל שורה נוספת
        if (textLength > 200) baseTime += (textLength - 200) * 30; // זמן נוסף לטקסטים גדולים
        
        // התאמה למודל
        if (model && model.includes('2.5-pro')) {
            baseTime *= 1.3; // מודל חזק יותר = זמן יותר
        }
        
        return Math.min(baseTime, 120000); // מקסימום 2 דקות
    }

    /**
     * ביצוע שלב עם מעקב התקדמות
     */
    async executeStep(processId, stepIndex, stepFunction) {
        const processInfo = this.activeProcesses.get(processId);
        if (!processInfo) throw new Error('Process not found');

        processInfo.currentStep = stepIndex;
        processInfo.steps[stepIndex].status = 'active';
        processInfo.steps[stepIndex].startTime = Date.now();
        
        this.emit('progress', processId, processInfo);

        try {
            const result = await stepFunction();
            
            processInfo.steps[stepIndex].status = 'completed';
            processInfo.steps[stepIndex].endTime = Date.now();
            processInfo.completedSteps = stepIndex + 1;
            
            this.emit('progress', processId, processInfo);
            
            return result;
        } catch (error) {
            processInfo.steps[stepIndex].status = 'error';
            processInfo.steps[stepIndex].error = error.message;
            throw error;
        }
    }

    /**
     * ניתוח מבנה הטקסט
     */
    async analyzeTextStructure(text) {
        await this.delay(200);
        
        const lines = text.split('\n');
        const analysis = {
            totalLines: lines.length,
            hasHeaders: /^#{1,6}\s/.test(text),
            hasLists: /^[\s]*[-*+]\s/.test(text) || /^[\s]*\d+\.\s/.test(text),
            hasBoldText: /\*\*.*\*\*/.test(text) || /__.*__/.test(text),
            hasItalicText: /\*.*\*/.test(text) || /_.*_/.test(text),
            paragraphs: text.split('\n\n').length,
            avgLineLength: lines.reduce((sum, line) => sum + line.length, 0) / lines.length
        };
        
        return analysis;
    }

    /**
     * יצירת prompt מותאם
     */
    async createOptimizedPrompt(text, basePrompt, textLength, disableItalicFormatting = false) {
        await this.delay(300);
        
        const analysis = await this.analyzeTextStructure(text);
        
        // Create formatting instruction based on user preference
        const formattingInstructions = disableItalicFormatting 
            ? `4. הדגש מילות מפתח חשובות (**מילה**) - אל תשתמש בעיצוב נטייה (*מילה*)`
            : `4. הדגש מילות מפתח חשובות (**מילה**, *מילה*)`;
        
        let optimizedPrompt = basePrompt || `
אתה מומחה בארגון ועריכת טקסטים בעברית. המשימה שלך היא לארגן את הטקסט הבא לפורמט Markdown מושלם.

� חוקים קריטיים - אל תעבור על אלה בשום אופן:
• שמור על כל התוכן המקורי במלואו - כל מילה, כל שורה, כל פרט
• אל תמחק, תחסיר או תקצר אף חלק מהטקסט המקורי  
• אל תחזור על תוכן - כל חלק צריך להופיע פעם אחת בלבד
• וודא שהטקסט המאורגן זהה באורך ובתוכן לטקסט המקורי
• אל תוסיף מידע שלא היה בטקסט המקורי
• אל תסכם או תקצר - זה ארגון ולא סיכום!

⚠️ זכור: זהו תהליך ארגון ולא סיכום - כל המידע חייב להישאר!

📋 משימות הארגון:
1. צור היררכיה ברורה עם כותרות H1, H2, H3 לפי הקשר הלוגי
2. חלק לפסקאות מובנות ונושאיות תוך שמירה על כל התוכן
3. ארגן רשימות בפורמט Markdown נכון (-, *, 1., 2., וכו')
${formattingInstructions}
5. צור מבנה לוגי וזורם שקל לקריאה
6. שפר פיסוק ומבנה משפטים ללא שינוי המשמעות או המידע
7. הסר שורות ריקות מיותרות (לא יותר מ-2 שורות ריקות ברצף)

📖 כללי פורמט:
• השתמש בעברית תקינה וברורה
• שמור על המינוח המקורי של מושגים יהודיים/תורניים
• ארגן ציטוטים ומקורות בפורמט אחיד
• צור מבנה חזותי נעים ומאורגן

✅ בסיום - וודא שכל המידע מהטקסט המקורי נכלל בתגובה!
`;

        // התאמות מיוחדות לפי גודל הטקסט
        if (textLength > 200) {
            optimizedPrompt += `

🔧 הנחיות מיוחדות לטקסט גדול:
• חלק לחלקים ראשיים עם כותרות H1
• השתמש בכותרות H2 לתת-נושאים  
• וודא זרימה לוגית בין הקטעים
• שמור על היררכיה עקבית לאורך הטקסט
• ⚠️ זכור: זהו טקסט גדול - חשוב במיוחד לא להחסיר אף מידע!
• וודא שכל הקטעים, כל הפסקאות וכל הפרטים מהטקסט המקורי נכללים
`;
        } else if (textLength > 100) {
            optimizedPrompt += `

🔧 הנחיות לטקסט בינוני:
• השתמש בכותרות H1 ו-H2 לארגון
• וודא שכל המידע נשמר ומאורגן היטב
`;
        }

        return optimizedPrompt;
    }

    /**
     * קריאה לבינה מלאכותית עם מעקב התקדמות
     */
    async callAIForOrganization(text, prompt, model, apiKey, processId) {
        const processInfo = this.activeProcesses.get(processId);
        
        // עדכון מצב שליחה
        if (processInfo) {
            processInfo.steps[processInfo.currentStep].currentOperation = 'שולח בקשה למודל AI...';
            this.emit('progress', processId, processInfo);
        }

        const isGoogleModel = model && (model.includes('gemini') || model.includes('palm'));
        
        if (isGoogleModel) {
            return await this.callGoogleAIWithProgress(text, prompt, model, apiKey, processId);
        } else {
            return await this.callOpenAIWithProgress(text, prompt, model, apiKey, processId);
        }
    }

    /**
     * קריאה ל-Google AI עם מעקב התקדמות
     */
    async callGoogleAIWithProgress(text, prompt, model, apiKey, processId) {
        const processInfo = this.activeProcesses.get(processId);
        const textLength = text.split('\n').length;
        const textWordCount = text.split(/\s+/).length;
        
        const systemPrompt = `${prompt}

הטקסט לארגון (${textLength} שורות, ${textWordCount} מילים):
${text}

חשוב מאוד: החזר את כל התוכן המקורי במלואו! וודא שכל המידע, כל השורות וכל הפרטים מהטקסט המקורי נכללים בתגובה המאורגנת.
החזר אך ורק את הטקסט המאורגן ללא הסברים או הערות נוספות.`;

        // הגדרות מותאמות לגודל הטקסט - הגדלת הטוקנים לוודא שכל התוכן נכלל
        let maxTokens;
        if (textLength > 300) {
            maxTokens = 32000;  // טקסט מאוד גדול
        } else if (textLength > 200) {
            maxTokens = 24000;  // טקסט גדול
        } else if (textLength > 100) {
            maxTokens = 16000;  // טקסט בינוני
        } else {
            maxTokens = 8000;   // טקסט קטן
        }
        
        // וידוא שה-maxTokens גדול מספיק יחסית לטקסט המקורי
        const estimatedInputTokens = Math.ceil(textWordCount * 1.3); // הערכה גסה של טוקנים
        const safeOutputTokens = Math.max(maxTokens, estimatedInputTokens * 1.5); // לפחות פי 1.5 מהטקסט המקורי
        
        console.log(`Processing text: ${textLength} lines, ${textWordCount} words, maxTokens: ${safeOutputTokens}`);
        
        const GOOGLE_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/';
        const url = `${GOOGLE_API_BASE_URL}${model}:generateContent?key=${apiKey}`;
        
        // עדכון מצב
        if (processInfo) {
            processInfo.steps[processInfo.currentStep].currentOperation = 'מעבד ב-Google AI...';
            this.emit('progress', processId, processInfo);
        }

        const fetch = require('node-fetch');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: systemPrompt
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.1,
                    maxOutputTokens: safeOutputTokens,
                    topP: 0.9,
                    topK: 40
                }
            })
        });

        // עדכון מצב
        if (processInfo) {
            processInfo.steps[processInfo.currentStep].currentOperation = 'מקבל תגובה...';
            this.emit('progress', processId, processInfo);
        }

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Google AI API Error (${response.status}): ${errorText}`);
        }

        const data = await response.json();
        const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!textResponse) {
            throw new Error('לא התקבלה תגובה תקינה מ-Google AI API');
        }

        return textResponse.trim();
    }

    /**
     * עיבוד תוצאות
     */
    async postProcessText(organizedText) {
        await this.delay(400);
        
        let processedText = organizedText;
        
        // ניקוי שורות ריקות מיותרות
        processedText = processedText.replace(/\n{3,}/g, '\n\n');
        
        // תיקון רווחים מיותרים
        processedText = processedText.replace(/[ \t]+$/gm, '');
        
        // וידוא שהטקסט מסתיים בשורה חדשה
        if (!processedText.endsWith('\n')) {
            processedText += '\n';
        }
        
        return processedText;
    }

    /**
     * אימות איכות הטקסט
     */
    async validateTextQuality(originalText, organizedText) {
        await this.delay(200);
        
        const originalLines = originalText.split('\n');
        const organizedLines = organizedText.split('\n');
        const originalWords = originalText.split(/\s+/).filter(word => word.length > 0).length;
        const organizedWords = organizedText.split(/\s+/).filter(word => word.length > 0).length;
        
        // בדיקה שלא אבד תוכן משמעותי
        const wordsRatio = organizedWords / originalWords;
        const linesRatio = organizedLines.length / originalLines.length;
        
        console.log(`Quality check: Original ${originalLines.length} lines (${originalWords} words), Organized ${organizedLines.length} lines (${organizedWords} words)`);
        console.log(`Ratios: Words ${(wordsRatio * 100).toFixed(1)}%, Lines ${(linesRatio * 100).toFixed(1)}%`);
        
        // אזהרה אם חסר תוכן משמעותי
        if (wordsRatio < 0.85) {
            console.warn(`⚠️ אזהרה: הטקסט המאורגן קצר משמעותית מהמקור (${(wordsRatio * 100).toFixed(1)}% מהמילים המקוריות)`);
            console.warn(`יתכן שחלק מהתוכן נחתך או לא נכלל בתגובה המאורגנת`);
        }
        
        if (linesRatio < 0.6) {
            console.warn(`⚠️ אזהרה: מספר השורות במקום המאורגן קטן משמעותית (${(linesRatio * 100).toFixed(1)}% מהשורות המקוריות)`);
        }
        
        // בדיקה שהטקסט המאורגן לא נחתך באמצע
        const lastLines = organizedText.trim().split('\n').slice(-3);
        const isLikelyTruncated = lastLines.some(line => 
            line.length > 50 && !line.match(/[.!?]$/) && !line.match(/[\u0590-\u05FF][.!?]$/)
        );
        
        if (isLikelyTruncated) {
            console.warn(`⚠️ אזהרה: הטקסט המאורגן נראה כאילו נחתך באמצע`);
        }
        
        return {
            originalWords,
            organizedWords,
            originalLines: originalLines.length,
            organizedLines: organizedLines.length,
            wordsRatio,
            linesRatio,
            isValid: wordsRatio >= 0.85 && !isLikelyTruncated,
            possibleTruncation: isLikelyTruncated,
            contentLoss: wordsRatio < 0.85
        };
    }

    /**
     * קבלת מידע התקדמות עבור תהליך
     */
    getProcessInfo(processId) {
        return this.activeProcesses.get(processId);
    }

    /**
     * ביטול תהליך
     */
    cancelProcess(processId) {
        const processInfo = this.activeProcesses.get(processId);
        if (processInfo) {
            processInfo.status = 'cancelled';
            this.emit('cancelled', processId);
            this.activeProcesses.delete(processId);
        }
    }

    /**
     * השהיה (utility function)
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = new TextOrganizationProgressService();
