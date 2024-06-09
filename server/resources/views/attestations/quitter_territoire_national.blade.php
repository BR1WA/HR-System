<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>Demande de quitter le territoire national</title>
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
            <h3>Le Doyen de la Faculté Ossoul-Eddine-Tétouan :</h3>
            <p> - Vu le Dahir N° 1.58.008, du Chàabane 1377 (3 février 1958) portant statut général de la Fonction Publique.</p>
            <p> - Vu la demande de l’intéressé (e) en date du : .............</p>
        </div>
        <div class="content">
            <h4>ARRETE CE QUI SUIT :</h4>
            <p>ARTICLE PREMIER : A compter du {{ $date_debut }} jusqu’au {{ $date_fin }},</p>
            <p>Mr : {{ $nom }}, S.O.M : {{ $cin }}, Grade : {{ $grade }}, Est autorisé de s’absenter durant la période indiquée.</p>
            <p>ARTICLE DEUXIEME : l’intéressé (e) est autorisé(e) à quitter le territoire marocain durant la période mentionnée ; et qu’il(elle) est tenu(e) D’aviser le service intéressé de sa reprise de service après expiration Du congé.</p>
        </div>
        <div class="signature">
            <p>Fait à Tétouan le : .............</p>
        </div>
    </div>
</body>
</html>
