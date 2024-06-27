<!-- resources/views/attestations/demande__vacance_annuelle_ar.blade.php -->

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'dejavusans', sans-serif;
            direction: rtl;
            text-align: right;
        }
        .container {
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
        .boxes {
            display: flex;
            justify-content: space-between;
            margin-top: 50px;
        }
        .box {
            width: 45%;
            border: 1px solid #000;
            padding: 10px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h3>طلب العطلة السنوية</h3>
        </div>
        
        <div class="content">
            <p>الاسم الكامل: {{ $nom }}</p>
            <p>رقم التتبع: {{ $cin }}</p>
            <p>الإطار: {{ $grade }}</p>

            <p>إلى السيد عميد كلية أصول الدين - تطوان</p>
            
            <p>سلام تام بوجود مولانا الإمام أيده الله</p>
            
            <p>
                وبعد، أنا الموقع أسفله السيد (ة): {{ $nom }} بصفتي : {{ $grade }} <br> بكلية أصول الدين بتطوان، أطلب من سيادتكم الموقرة تمكيني من .يوم/ أيام من رخصتي السنوية   
            </p>

            <p>تاريخ بداية العطلة: {{ $date_debut }}</p>
            <p>تاريخ نهاية العطلة: {{ $date_fin }}</p>
            
            <p>وفي انتظار ردكم على طلبي، تقبلوا مني سيدي العميد أسمى عبارات التقدير والاحترام.</p>
        </div>
        
        <div class="signature">
            توقيع الموظف
        </div>
        
        <div class="boxes">
            <div class="box">
                رأي الرئيس المباشر
            </div>
            <div class="box">
                قرار العميد
            </div>
        </div>
    </div>
</body>
</html>
