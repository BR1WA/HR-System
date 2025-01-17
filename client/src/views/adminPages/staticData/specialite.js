const Specialite = [
    { label: 'ADMINISTRATION ET ORGANISATION SCOLAIRES', value: 1, arabic: 'ادارة وتنظيم المدارس' },
    { label: 'AL-CHARIA', value: 2, arabic: 'الشريعة' },
    { label: 'AL-LOGHA AL ARABIA', value: 3, arabic: 'اللغة العربية' },
    { label: 'ANATOMIE', value: 4, arabic: 'علم التشريح' },
    { label: 'ANATOMIE GENERALE', value: 5, arabic: 'علم التشريح العام' },
    { label: 'ANATOMIE PATHOLOGIQUE', value: 6, arabic: 'علم التشريح المرضي' },
    { label: 'ANATOMIE SPECIALE', value: 7, arabic: 'علم التشريح الخاص' },
    { label: 'ANESTHESIE _ REANOMATION', value: 8, arabic: 'التخدير والانعاش' },
    { label: 'ANESTHESIOLOGIE', value: 9, arabic: 'علم التخدير' },
    { label: 'APPAREIL DIGESTIF', value: 10, arabic: 'الجهاز الهضمي' },
    { label: 'APPAREIL ET MALADIES RESPIRATOIRE', value: 11, arabic: 'الجهاز التنفسي وأمراضه' },
    { label: 'APPAREIL GENITO-URINAIRES', value: 12, arabic: 'الجهاز البولي التناسلي' },
    { label: 'APPAREIL LOCOMOTEUR', value: 13, arabic: 'الجهاز الحركي' },
    { label: 'APPLICATION INDUSTRIELLE', value: 14, arabic: 'التطبيق الصناعي' },
    { label: 'ART', value: 15, arabic: 'الفن' },
    { label: 'AUTRES SPECIALITES', value: 16, arabic: 'تخصصات أخرى' },
    { label: 'AUTRES SPECIALITES DE MEDECINE', value: 17, arabic: 'تخصصات أخرى في الطب' },
    { label: 'AUTRES SPECIALITES DE MEDECINE DENTAIRE', value: 18, arabic: 'تخصصات أخرى في طب الأسنان' },
    { label: 'AUTRES SPECIALITES DE PHARMACIE', value: 19, arabic: 'تخصصات أخرى في الصيدلة' },
    { label: 'BIOCHIMIE', value: 20, arabic: 'الكيمياء الحيوية' },
    { label: 'BIOLOGIE', value: 21, arabic: 'علم الأحياء' },
    { label: 'BIOLOGIE ET MATIERES FONDAMENTALES', value: 22, arabic: 'علم الأحياء والمواد الأساسية' },
    { label: 'BIOMATERIAUX', value: 23, arabic: 'المواد الحيوية' },
    { label: 'BIOPHYSIQUE', value: 24, arabic: 'الفيزياء الحيوية' },
    { label: 'BOTANIQUE', value: 25, arabic: 'علم النبات' },
    { label: 'CARDIOLOGIE', value: 26, arabic: 'أمراض القلب' },
    { label: 'CHARIA', value: 27, arabic: 'الشريعة' },
    { label: 'CHIMIE', value: 28, arabic: 'الكيمياء' },
    { label: 'CHIRURGIE CARDIO_VASCULAIRE', value: 29, arabic: 'جراحة القلب والأوعية الدموية' },
    { label: 'CHIRURGIE PEDIATRIQUE', value: 30, arabic: 'جراحة الأطفال' },
    { label: 'CHIRURGIE THORACIQUE', value: 31, arabic: 'جراحة الصدر' },
    { label: 'COMMERCE', value: 32, arabic: 'التجارة' },
    { label: 'CROISSANCE ET DEVOLOPPEMENT DE LA FACE', value: 33, arabic: 'نمو وتطور الوجه' },
    { label: 'DENTISTRIE PREVENTIVE', value: 34, arabic: 'طب الأسنان الوقائي' },
    { label: 'DEONTOLOGIE ET ORGANISATION PROFESSIONNELLE', value: 35, arabic: 'أخلاقيات المهنة والتنظيم المهني' },
    { label: 'DERMATOLOGIE', value: 36, arabic: 'الأمراض الجلدية' },
    { label: 'DIDACTIQUE DES LANGUES', value: 37, arabic: 'علم تعليم اللغات' },
    { label: 'DIDACTIQUE DES SCIENCES EXACTES', value: 38, arabic: 'علم تعليم العلوم الدقيقة' },
    { label: 'DIDACTIQUE DES SCIENCES HUMAINES', value: 39, arabic: 'علم تعليم العلوم الإنسانية' },
    { label: 'DROIT PRIVE', value: 40, arabic: 'القانون الخاص' },
    { label: 'DROIT PUBLIC', value: 41, arabic: 'القانون العام' },
    { label: 'ECONOMIE', value: 42, arabic: 'الاقتصاد' },
    { label: 'EDUCATION PHYSIQUE', value: 43, arabic: 'التربية البدنية' },
    { label: 'ELECTRO _RADIOLOGIE', value: 44, arabic: 'الأشعة الكهربائية' },
    { label: 'ENDOCRINOLOGIE ET MALADIES METABOLIQUES', value: 45, arabic: 'علم الغدد الصماء والأمراض الاستقلابية' },
    { label: 'ENERGETIQUE', value: 46, arabic: 'الطاقة' },
    { label: 'EPIDEMIOLOGIE, NUTRITION, SANTE PUBLIQUE & PREVE', value: 47, arabic: 'علم الأوبئة والتغذية والصحة العامة والوقاية' },
    { label: 'ERGONOMIE', value: 48, arabic: 'علم الراحة' },
    { label: 'ETUDES AMAZIGHES', value: 49, arabic: 'الدراسات الأمازيغية' },
    { label: 'ETUDES HISPANO-LUSOPHONES', value: 50, arabic: 'الدراسات الإسبانية والبرتغالية' },
    { label: 'ETUDES ISLAMIQUES', value: 51, arabic: 'الدراسات الإسلامية' },
    { label: 'FONDEMENT DE L\'EDUCATION', value: 52, arabic: 'أسس التربية' },
    { label: 'GASTRO_ENTEROLOGIE', value: 53, arabic: 'أمراض الجهاز الهضمي' },
    { label: 'GENIE AGROALIMENTAIRE', value: 54, arabic: 'الهندسة الزراعية الغذائية' },
    { label: 'GENIE DE L\'ENVIRONNEMENT', value: 55, arabic: 'الهندسة البيئية' },
    { label: 'GENIE DES PROCEDES', value: 56, arabic: 'هندسة العمليات' },
    { label: 'GENIE ELECTRIQUE', value: 57, arabic: 'الهندسة الكهربائية' },
    { label: 'GENIE INDUSTRIEL', value: 58, arabic: 'الهندسة الصناعية' },
    { label: 'GENIE MECANIQUE', value: 59, arabic: 'الهندسة الميكانيكية' },
    { label: 'GENIE MINERAL', value: 60, arabic: 'الهندسة المعدنية' },
    { label: 'GENIE MODELISATION ET INFORMATIQUE SCIENTIFIQUE', value: 61, arabic: 'هندسة النمذجة والمعلوماتية العلمية' },
    { label: 'GENIE TELECOMMUNICATIONS ET RESEAUX', value: 62, arabic: 'الهندسة في الاتصالات والشبكات' },
    { label: 'GENIE URBAIN ET ENVIRONNEMENT', value: 63, arabic: 'الهندسة الحضرية والبيئة' },
    { label: 'GEOGRAPHIE', value: 64, arabic: 'الجغرافيا' },
    { label: 'GEOLOGIE', value: 65, arabic: 'الجيولوجيا' },
    { label: 'GESTION', value: 66, arabic: 'الإدارة' },
    { label: 'GINIE CIVIL', value: 67, arabic: 'الهندسة المدنية' },
    { label: 'GLANDES ENDOCRINES ET REVETEMENT', value: 68, arabic: 'الغدد الصماء والجهاز التناسلي' },
    { label: 'GYNECOLOGIE OBSTETRIQUE', value: 69, arabic: 'أمراض النساء والتوليد' },
    { label: 'GYNECO-OBSTERIQUE', value: 70, arabic: 'أمراض النساء والتوليد' },
    { label: 'HEMATHOLOGIE', value: 71, arabic: 'علم الدم' },
    { label: 'HEMATHOLOGIE CLINIQUE', value: 72, arabic: 'علم الدم السريري' },
    { label: 'HISTO-EMBRYOLOGIE GENERALE', value: 73, arabic: 'علم الأنسجة والأجنة العام' },
    { label: 'HISTOIRE', value: 74, arabic: 'التاريخ' },
    { label: 'HISTOIRE GEOGRAPHIE', value: 75, arabic: 'التاريخ والجغرافيا' },
    { label: 'HISTOLOGIE ET EMBRYOLOGIE', value: 76, arabic: 'علم الأنسجة والأجنة' },
    { label: 'HISTOLOGIE SPECIALE', value: 77, arabic: 'علم الأنسجة الخاص' },
    { label: 'IMAGERIE MEDICALE', value: 78, arabic: 'التصوير الطبي' },
    { label: 'IMMUNOLOGIE', value: 79, arabic: 'علم المناعة' },
    { label: 'INFORMATIQUE', value: 80, arabic: 'علوم الحاسوب' },
    { label: 'LANGUE ET LITERATURE ALLMANDES', value: 81, arabic: 'اللغة والأدب الألماني' },
    { label: 'LANGUE ET LITERATURE ANGLAISES', value: 82, arabic: 'اللغة والأدب الإنجليزي' },
    { label: 'LANGUE ET LITERATURE ARABES', value: 83, arabic: 'اللغة والأدب العربي' },
    { label: 'LANGUE ET LITERATURE ESPAGNOLES', value: 84, arabic: 'اللغة والأدب الإسباني' },
    { label: 'LANGUE ET LITERATURE FRANCAISES', value: 85, arabic: 'اللغة والأدب الفرنسي' },
    { label: 'LANGUE ET LITERATURE HEBREVES', value: 86, arabic: 'اللغة والأدب العبري' },
    { label: 'LANGUE ET LITERATURE ITALIENNES', value: 87, arabic: 'اللغة والأدب الإيطالي' },
    { label: 'LANGUE ET LITERATURE PERSES', value: 88, arabic: 'اللغة والأدب الفارسي' },
    { label: 'LANGUE ET LITERATURE RUSSES', value: 89, arabic: 'اللغة والأدب الروسي' },
    { label: 'LANGUE ET LITERATURE TURQUES', value: 90, arabic: 'اللغة والأدب التركي' },
    { label: 'MANAGEMENT', value: 91, arabic: 'الإدارة' },
    { label: 'MATHEMATIQUES', value: 92, arabic: 'الرياضيات' },
    { label: 'MEDECINE', value: 93, arabic: 'الطب' },
    { label: 'MEDECINE DENTAIRE', value: 94, arabic: 'طب الأسنان' },
    { label: 'MEDECINE EXPERIMENTALE', value: 95, arabic: 'الطب التجريبي' },
    { label: 'MEDECINE LEGALE ET MEDECINE DE TRAVAIL', value: 96, arabic: 'الطب الشرعي وطب العمل' },
    { label: 'MEDECINE PHYSIQUE ET REEDUCATION', value: 97, arabic: 'الطب الفيزيائي وإعادة التأهيل' },
    { label: 'MEDECINE PREVENTIVE, SANTE PUBLIQUE & HYGIENE', value: 98, arabic: 'الطب الوقائي والصحة العامة والنظافة' },
    { label: 'MEDECINE SOCIALE ET COMMUNAUTAIRE', value: 99, arabic: 'الطب الاجتماعي والمجتمعي' },
    { label: 'MERE -ENFANT', value: 100, arabic: 'الأم والطفل' },
    { label: 'MICROBIOLOGIE', value: 101, arabic: 'علم الأحياء الدقيقة' },
    { label: 'MORPHOLOGIE DENTAIRE', value: 102, arabic: 'علم التشريح السني' },
    { label: 'NEPHROLOGIE', value: 103, arabic: 'أمراض الكلى' },
    { label: 'NEURO_CHIRURGIE', value: 104, arabic: 'جراحة الأعصاب' },
    { label: 'NEURO_PSYCHIATRIE', value: 105, arabic: 'الطب النفسي العصبي' },
    { label: 'OCLUSODONTIE', value: 106, arabic: 'علم تطابق الأسنان' },
    { label: 'ODONTOLOGIE CHIRURGICALE', value: 107, arabic: 'جراحة الأسنان' },
    { label: 'ODONTOLOGIE CONSERVATRICE', value: 108, arabic: 'طب الأسنان التحفظي' },
    { label: 'OPHTALMOLOGIE', value: 109, arabic: 'طب العيون' },
    { label: 'ORTHOPEDIE DENTO_FACIALE', value: 110, arabic: 'تقويم الأسنان والوجه' },
    { label: 'OSSOUL EDDINE', value: 111, arabic: 'أصول الدين' },
    { label: 'OTO-NEURO-OPHTALMOLOGIE', value: 112, arabic: 'طب الأذن والأنف والحنجرة والأعصاب والعين' },
    { label: 'OTO-RHINO -LARYNGOLOGIE', value: 113, arabic: 'طب الأنف والأذن والحنجرة' },
    { label: 'PARASITOLOGIE', value: 114, arabic: 'علم الطفيليات' },
    { label: 'PARODONTOLOGIE', value: 115, arabic: 'علم أمراض اللثة' },
    { label: 'PATHOLOGIE', value: 116, arabic: 'علم الأمراض' },
    { label: 'PATHOLOGIE INFANTILE', value: 117, arabic: 'علم أمراض الأطفال' },
    { label: 'PATHOLOGIE MEDICALE', value: 118, arabic: 'علم الأمراض الطبية' },
    { label: 'PEDIATRIE', value: 119, arabic: 'طب الأطفال' },
    { label: 'PEDODONTIE', value: 120, arabic: 'طب أسنان الأطفال' },
    { label: 'PHARMACIE', value: 121, arabic: 'الصيدلة' },
    { label: 'PHARMACOLOGIE', value: 122, arabic: 'علم الأدوية' },
    { label: 'PHARMACOLOGIE CLINIQUE', value: 123, arabic: 'علم الأدوية السريري' },
    { label: 'PHILOSOPHIE ET PENSEE ISLAMIQUE', value: 124, arabic: 'الفلسفة والفكر الإسلامي' },
    { label: 'PHYSILOGIE', value: 125, arabic: 'علم الفسيولوجيا' },
    { label: 'PHYSIOLOGIE', value: 126, arabic: 'علم الفسيولوجيا' },
    { label: 'PHYSIQUE', value: 127, arabic: 'الفيزياء' },
    { label: 'PHYTOLOGIE', value: 128, arabic: 'علم النبات' },
    { label: 'PNEUMO-PHTYSIOLOGIE', value: 129, arabic: 'طب الرئة والدرن' },
    { label: 'PROTHESE ADJOINTE', value: 130, arabic: 'تركيبات الأسنان المتحركة' },
    { label: 'PROTHESE CONJOINTE', value: 131, arabic: 'تركيبات الأسنان الثابتة' },
    { label: 'PROTHESE MAXILO_FACIALE', value: 132, arabic: 'تركيبات الوجه والفك' },
    { label: 'PSYCHOLOGIE', value: 133, arabic: 'علم النفس' },
    { label: 'PSYCHOLOGIE ET MEDECINE DENTAIRE', value: 134, arabic: 'علم النفس وطب الأسنان' },
    { label: 'PSYCOLOGIE DE L\'EDUCATION', value: 135, arabic: 'علم نفس التربية' },
    { label: 'RADIOLOGIE', value: 136, arabic: 'علم الأشعة' },
    { label: 'RADIOTHERAPIE', value: 137, arabic: 'العلاج الإشعاعي' },
    { label: 'RECHERCHE BIBLIOGRAPHIQUE', value: 138, arabic: 'البحث البيبليوغرافي' },
    { label: 'SANS SPECIALITE OU INCONNUE', value: 139, arabic: 'بدون تخصص أو غير معروف' },
    { label: 'SCIENCE DE L\'EDUCATION', value: 140, arabic: 'علوم التربية' },
    { label: 'SCIENCE DES MATERIAUX', value: 141, arabic: 'علم المواد' },
    { label: 'SCIENCES BIOMEDICALES', value: 142, arabic: 'العلوم الطبية الحيوية' },
    { label: 'SCIENCES DE LA TERRE', value: 143, arabic: 'علوم الأرض' },
    { label: 'SCIENCES DE L\'EDUCATION', value: 144, arabic: 'علوم التربية' },
    { label: 'SCIENCES DE L\'INGENIERIE', value: 145, arabic: 'علوم الهندسة' },
    { label: 'SCIENCES DU MEDICAMENT', value: 146, arabic: 'علوم الدواء' },
    { label: 'SCIENCES FONDAMENTAL PRECLINIQUES', value: 147, arabic: 'العلوم الأساسية قبل السريرية' },
    { label: 'SCIENCES NATURELLES', value: 148, arabic: 'العلوم الطبيعية' },
    { label: 'SOCIOLOGIE', value: 149, arabic: 'علم الاجتماع' },
    { label: 'TECHNIQUE DE MANAGEMENT', value: 150, arabic: 'تقنيات الإدارة' },
    { label: 'TECHNIQUE D\'EXPRESSION ET DE COMMUNICATION/LANGUE ET COMMUNICATION', value: 151, arabic: 'تقنيات التعبير والتواصل / اللغة والتواصل' },
    { label: 'TECHNIQUES D\'ANALYSE ET CONTROLE DE QUALITE', value: 152, arabic: 'تقنيات التحليل ومراقبة الجودة' },
    { label: 'TECHNIQUES DE COMMUNICATION COMMERCIALE', value: 153, arabic: 'تقنيات الاتصال التجاري' },
    { label: 'TECHNIQUES DE MANAGEMENT', value: 154, arabic: 'تقنيات الإدارة' },
    { label: 'TECHNOLOGIE', value: 155, arabic: 'التكنولوجيا' },
    { label: 'TECHNOLOGIE DE L\'EDUCATION', value: 156, arabic: 'تكنولوجيا التعليم' },
    { label: 'TRADUCTION', value: 157, arabic: 'الترجمة' },
    { label: 'TRAUMATOLOGIE', value: 158, arabic: 'طب الإصابات' },
    { label: 'URGENCE MEDICO-CHIRURGICALES', value: 159, arabic: 'الطوارئ الطبية والجراحية' },
    { label: 'UROLOGIE', value: 160, arabic: 'طب المسالك البولية' },
    { label: 'VIROLOGIE', value: 161, arabic: 'علم الفيروسات' },
    { label: 'ZOOLOGIE', value: 162, arabic: 'علم الحيوان' }
  ];

export default Specialite;