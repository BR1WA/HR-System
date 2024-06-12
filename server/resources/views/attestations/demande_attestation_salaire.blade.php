<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>طلب شهادة الأجرة</title>
    <style>
        body {
            font-family: 'dejavusans', sans-serif;
            direction: rtl;
            text-align: right;
            margin: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .content {
            margin: 20px 0;
        }
        .signature {
            text-align: left;
            margin-top: 50px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h3>طلب شهادة الأجرة</h3>
        </div>
        <div class="content">
            <p>الاسم الكامل: {{ $nom }}</p>
            <p>تطوان في : {{ $date }}</p>
            <p>الإطار: {{ $grade }}</p>
            <p>إلى السيد عميد كلية أصول الدين - تطوان -</p>
            <p>الموضوع : طلب شهادة الأجرة</p>
            <p>سلام تام بوجود مولانا الإمام المؤيد بالله</p>
            <p>وبعد، أنا الموقع أسفله السيد (ة): {{ $nom }} بصفتي : {{ $grade }} بكلية أصول الدين بتطوان، أطلب من سيادتكم الموقرة تمكيني من نسخ من شهادة الأجرة قصد استعمالها في أغراض إدارية.</p>
            <p>تاريخ البداية : {{ $date_debut }}</p>
            <p>تاريخ النهاية : {{ $date_fin }}</p>
            <p>وفي انتظار ردكم على طلبي تقبلوا سيدي العميد أسمى عبارات التقدير والاحترام.</p>
        </div>
    </div>
</body>
</html>
