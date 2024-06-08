<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>شهادة العمل</title>
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
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h3>شهادة العمل</h3>
        </div>
        <div class="content">
            <p>يشهد عميد كلية أصول الدين بتطوان أن :</p>
            <ul>
                <li>السيـــد (ة): {{ $nom }}</li>
                <li>رقم البطاقة الوطنية : {{ $num_cin }}</li>
                <li>رقم التأجير : {{ $num_tajir }}</li>
                <li>الإطــــــار : {{ $grade }}</li>
            </ul>
            <p>يعمل بهذه الكلية.</p>
            <p>وحررت  له (ها) هذه الشهادة بناء على طلبه (ها) قصد  الإدلاء بها عند الاقتضاء.</p>
            <p>تطوان في : {{ $date }}</p>
        </div>
    </div>
</body>
</html>
