<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <title>Attestation de Travail</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
    * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
</style>

</head>
<body>
    <div class="flex flex-col justify-center items-center">
        <div class="text-center">
            <div class="flex flex-row justify-between">   
                <p>Université ABDELMALEK ESSAADI<br>Faculté OSSOUL- EDDINE<br>Tétouan</p>
                <p dir="rtl">الحمد لله وحده</p>
                <p dir="rtl">جامعة عبد المالك السعدي<br> كلية اصول الدين<br> تطوان</p>
            </div>
            <h3 class="text-lg font-semibold underline">ATTESTATION DE TRAVAIL</h3>
        </div>
        <p>Je soussigné:</p>
        <p>Le Doyen de la faculté Ossoul-Eddine:</p>
        <p>Atteste par la présente que:</p>
        <p>Mr/Mme: {{ $nom }} {{$prenom}}</p>
        <p>C.I.N : {{$cin}}</p>
        <p>Somme:</p>
        <p>Exerce au sein de cet établissement la fonction de: "position"</p>
        <p>Cette attestation est délivrée à l'intéressé(e) pour servir et valoir ce que de droit.</p>
        <p>Fait à Tétouan le: {{ $date }}</p>
        <p>Faculté Ossoul-Eddine /AV : Abd lkhalak Toresse/93000/P.B : 95/TETOUAN</p>
        <p>Tl : 0539371107/0661440872- Fax :0539973969</p>
        <p>sete.web. : www.fod.ac.ma</p>
        <p>Université ABDELMALEK ESSAADI</p>
        <p>Faculté OSSOUL- EDDINE</p>
        <p>Tétouan</p>
    </div>
</body>
</html>
