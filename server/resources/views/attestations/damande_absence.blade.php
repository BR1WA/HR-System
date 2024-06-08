<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>طلب رخصة استثنائية</title>
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
            <h3>طلب رخصة استثنائية</h3>
        </div>
        <div class="content">
            <p>الاسم الكامل: {{ $nom }}</p>
            <p>تطوان في : {{ $date }}</p>
            <p>رقم التأجير : {{ $num_tajir }}</p>
            <p>الإطار: {{ $grade }}</p>
            <p>إلى السيد عميد كلية أصول الدين - تطوان -</p>
            <p>الموضوع : طلب رخصة استثنائية</p>
            <p>سلام تام بوجود مولانا الإمام المؤيد بالله</p>
            <p>وبعد، أنا الموقع أسفله السيد (ة): {{ $nom }} بصفتي : {{ $grade }} بكلية أصول الدين بتطوان، أطلب من سيادتكم الموقرة تمكيني من ... يوم/ أيام من الرخصة الاستثنائية السنوية قصد ...</p>
            <p>وفي انتظار ردكم على طلبي، تقبلوا مني سيدي العميد أسمى عبارات التقدير والاحترام.</p>
        </div>
        <div class="signature">
            توقيع الموظف
        </div>
        <div class="boxes">
            <div class="box">
                رأي الرئيس المباشر : 
            </div>
            <div class="box">
                قرار العميد:
            </div>
        </div>
    </div>
</body>
</html>
