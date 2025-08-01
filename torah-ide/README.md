
# סביבת לימוד תורה - מהדורת Mac

![Torah IDE](https://img.shields.io/badge/Torah-IDE-blue) ![macOS](https://img.shields.io/badge/macOS-Compatible-green) ![Hebrew](https://img.shields.io/badge/שפה-עברית-red)

## תיאור כללי

**סביבת לימוד תורה** היא יישום מתקדם המיועד ללימוד וחקר התורה, המשלב כלים טכנולוגיים חדישים עם מקורות יהודיים אותנטיים. היישום מאפשר חיפוש חכם, ארגון טקסטים, ועבודה עם מקורות תורניים בצורה יעילה ומתקדמת.

---

## דרישות מערכת למק

### מינימום נדרש:
- **מערכת הפעלה**: macOS 10.15 (Catalina) ומעלה
- **זיכרון**: 4GB RAM (מומלץ 8GB+)
- **מקום אחסון**: 500MB מקום פנוי
- **מעבד**: Intel או Apple Silicon (M1/M2/M3)
- **חיבור אינטרנט**: נדרש לחיפוש ועדכונים

### תוכנות נדרשות:
- **Node.js**: גרסה 18.0 ומעלה
- **דפדפן**: Safari, Chrome, Firefox או Edge

---

## הורדה והתקנה

### שלב 1: הורדת Node.js

1. היכנסו לאתר [nodejs.org](https://nodejs.org)
2. הורידו את גרסת ה-LTS (Long Term Support) עבור macOS
3. הפעילו את הקובץ שהורדתם (.pkg)
4. עקבו אחר הוראות ההתקנה
5. אשרו את ההתקנה על ידי הפעלת Terminal וביצוע הפקודה:
   ```bash
   node --version
   ```

### שלב 2: הורדת סביבת לימוד תורה

1. הורידו את הפרויקט מ-GitHub או פרקו את הקובץ הדחוס
2. פתחו Terminal (מצאו אותו ב-Applications > Utilities)
3. נווטו לתיקיית הפרויקט:
   ```bash
   cd /path/to/Torah-IDE-Mac-Edition
   ```

### שלב 3: התקנת תלותות

1. בתוך תיקיית הפרויקט, נווטו לתיקיית הקצה העורפי (Backend):
   ```bash
   cd torah-ide/backend
   npm install
   ```

2. נווטו לתיקיית הקצה הקדמי (Frontend):
   ```bash
   cd ../frontend
   npm install
   ```

### שלב 4: הפעלה ראשונית

1. פתחו שני חלונות Terminal
2. **בחלון הראשון** - הפעילו את השרת העורפי:
   ```bash
   cd torah-ide/backend
   npm start
   ```

3. **בחלון השני** - הפעילו את הממשק הקדמי:
   ```bash
   cd torah-ide/frontend
   npm run dev
   ```

4. הדפדפן יפתח אוטומטיות לכתובת `http://localhost:3000`

---

## מדריך שימוש

### תכונות עיקריות

#### 🔍 חיפוש חכם
- חיפוש מתקדם בטקסטים תורניים
- חיפוש לפי מילות מפתח, שורשים או ביטויים
- חיפוש משולב במספר מקורות בו-זמנית

#### 📚 ניהול טקסטים
- יבוא וארגון טקסטים תורניים
- יצירת קטגוריות ותגיות מותאמות אישית
- שמירת מועדפים וסימניות

#### ✏️ כלי עריכה
- עורך טקסט מתקדם עם תמיכה בעברית
- הדגשת טקסט וסימון חשוב
- הוספת הערות ופרשנויות אישיות

#### 📊 ניתוח וסטטיסטיקות
- ניתוח תדירות מילים
- גרפים ומדדי התקדמות בלימוד
- דוחות מפורטים על פעילות הלימוד

### הפעלות בסיסיות

1. **יצירת פרויקט חדש**: 
   - לחצו על "פרויקט חדש" בעמוד הבית
   - תנו שם לפרויקט ובחרו קטגוריה

2. **יבוא טקסטים**:
   - גררו קבצי PDF או TXT לאזור העלאה
   - היישום יזהה אוטומטיות טקסט עברי

3. **חיפוש מתקדם**:
   - השתמשו בסרגל החיפוש העליון
   - הוסיפו מסננים לפי מקור, תאריך או נושא

4. **שמירת עבודה**:
   - העבודה נשמרת אוטומטיות בכל שינוי
   - ניתן לייצא לפורמטים שונים (PDF, Word)

---

## פתרון בעיות נפוצות

### 🔧 בעיות התקנה

**שגיאה: "command not found: node"**
```bash
# בדקו אם Node.js מותקן:
which node

# אם לא מותקן, הורידו מהאתר הרשמי
```

**שגיאה: "permission denied"**
```bash
# תנו הרשאות הפעלה לקבצים:
chmod +x torah-ide/setup_files/Torah-IDE.sh
```

**פורט תפוס**
```bash
# אם הפורט 3000 תפוס, שנו בקובץ הגדרות:
# עריכה של frontend/vite.config.js
```

### 🌐 בעיות דפדפן

- **הדף לא נטען**: ודאו שהשרת רץ ולא נסגר
- **טקסט לא מוצג נכון**: בדקו שהדפדפן תומך בעברית
- **איטיות**: נקו cache של הדפדפן או השתמשו במצב פרטי

### 📱 בעיות ביצועים

- **זיכרון גבוה**: סגרו יישומים אחרים בזמן השימוש
- **איטיות**: ודאו שיש מינימום 4GB זיכרון פנוי
- **קפיאות**: עדכנו את Node.js לגרסה העדכנית

---

## העדכונים ותחזוקה

### עדכון הפרויקט
```bash
# נווטו לתיקיית הפרויקט
cd Torah-IDE-Mac-Edition

# עדכנו את הקוד
git pull origin main

# עדכנו תלותות
cd torah-ide/backend && npm update
cd ../frontend && npm update
```

### גיבוי מידע
- הגדרות אישיות נשמרות ב: `~/Library/Application Support/Torah-IDE/`
- פרויקטים נשמרים ב: `~/Documents/Torah-IDE-Projects/`
- מומלץ לגבות תיקיות אלו באופן קבוע

---

## תמיכה ועזרה

### דרכי יצירת קשר

📧 **אימייל**: svivat-limud-torah@gmail.com  
🐙 **GitHub Issues**: פתחו בעיה בעמוד הפרויקט  
📚 **תיעוד**: מצאו מידע נוסף בתיקיית `docs/`

### שאלות נפוצות

**האם יש תמיכה באנגלית?**  
היישום מותאם בעיקר לעברית, אך ניתן להוסיף תמיכה באנגלית.

**איך מוסיפים מקורות חדשים?**  
השתמשו בכלי "יבוא מקורות" או פנו אלינו להוספת מקורות חדשים.

**האם המידע נשמר בענן?**  
כרגע השמירה מקומית בלבד. תכונת ענן תתווסף בעתיד.

---

## רישיון וזכויות יוצרים

הפרויקט מופץ תחת רישיון MIT. ניתן להשתמש, לשנות ולהפיץ בחופשיות עם ציון המקור.

**פותח על ידי**: צוות סביבת לימוד תורה  
**גרסה נוכחית**: 1.0.0  
**תאריך עדכון אחרון**: אוגוסט 2025

---

## תרומה לפרויקט

אנו מעוניינים בתרומות מהקהילה! דרכים לתרום:

1. **דיווח על באגים**: פתחו Issue ב-GitHub
2. **הצעות לשיפור**: שלחו אימייל או פתחו Discussion
3. **תרגומים**: עזרו בתרגום לשפות נוספות  
4. **קוד**: שלחו Pull Request עם שיפורים

תודה שבחרתם בסביבת לימוד תורה! 🙏

---

*"תלמוד תורה כנגד כולם"* - משנה פאה א:א

**Node.js**  
- Windows: Node.js v22.15.0 (x64) or the appropriate version for your PC  
- macOS: Latest stable Node.js from the official site

**Operating Systems**  
- Windows 10 or newer (64‑bit)  
- macOS 10.15 (Catalina) or newer

**Hardware**  
- 4 GB RAM minimum (8 GB+ recommended)  
- 200 MB free disk space

---

## 3. INSTALLATION INSTRUCTIONS

### 3.1 WINDOWS EDITION

**Level 1 – Node.js Install**  
- Download `node-v22.15.0-x64.msi` from the official Node.js site.  
- Run the MSI and follow the wizard.

**Level 2 – Dependencies Setup**  
- Open **Command Prompt** and navigate to the Torah‑IDE root folder.  
- Run:
  ```bat
  Torah-IDE-Setup.bat
  ```
- This installs all required npm packages.

**Level 3 – First Launch**  
- A window will open displaying a URL.  
- Click the link to start the IDE in your default browser.  
- **Important**: Do **NOT** close this Command Prompt window—it’s running the server for the IDE.

**Subsequent Launches**  
- Double-click the **Torah‑IDE** desktop shortcut.  
- The IDE will start; **do NOT close the original terminal window** or the IDE server will shut down.

### 3.2 MACOS EDITION

**Level 1 – Node.js Install**  
- Visit [nodejs.org](https://nodejs.org) and download the macOS installer.  
- Run the installer and complete setup.

**Level 2 – Dependencies Setup**  
- Open **Terminal** and `cd` into the `setup_files` directory.  
- Execute:
  ```sh
  ./Torah-IDE.sh
  ```
- This installs dependencies and opens a browser with the IDE link.

**Level 3 – First & Future Launches**  
- **First Time**: Click the link to start the IDE.  
- **Subsequent**: Use the desktop shortcut in **Applications** or your custom alias.  
- **Important**: Do **NOT** close the Terminal window running the script—it’s the IDE server.

---

## 4. VERIFICATION & TROUBLESHOOTING

**Check Node Version**:
```bash
node -v
```
Should return v22.15.0 (or your installed version).

**Log Files**:  
- Windows: `%USERPROFILE%\Torah-IDE\logs\`  
- macOS: `~/Torah-IDE/logs/`

**Common Issues**:
- **“Command not found”**: Ensure `.sh` is executable (`chmod +x Torah-IDE.sh`).  
- **Port already in use**: Change default port in `config.json`.

---

## 5. GLOSSARY & NOTES

- **Torah‑IDE**: A Bible-based, ultra-fast code editor.  
- **Support**: Raise issues on the GitHub Issues page if you hit roadblocks.

---

*End of SRS Document*
