const Grades = [
    { value: '99160101', label: 'ADJOINT ADMINISTRATIF 1ER GRADE', arabicLabel: 'مساعد إداري من الدرجة الأولى' },
    { value: '99160102', label: 'ADJOINT ADMINISTRATIF 2EME GRADE', arabicLabel: 'مساعد إداري من الدرجة الثانية' },
    { value: '99160103', label: 'ADJOINT ADMINISTRATIF 3EME GRADE', arabicLabel: 'مساعد إداري من الدرجة الثالثة' },
    { value: '99160104', label: 'ADJOINT ADMINISTRATIF 4EME GRADE', arabicLabel: 'مساعد إداري من الدرجة الرابعة' },
    { value: '99040005', label: 'ADJOINT TECHNIQUE', arabicLabel: 'مساعد تقني' },
    { value: '99150101', label: 'ADJOINT TECHNIQUE 1ER GRADE', arabicLabel: 'مساعد تقنى الدرجة الأولى' },
    { value: '99150102', label: 'ADJOINT TECHNIQUE 2EME GRADE', arabicLabel: 'مساعد تقنى الدرجة الثانية' },
    { value: '99150103', label: 'ADJOINT TECHNIQUE 3EME GRADE', arabicLabel: 'مساعد تقنى الدرجة الثالثة' },
    { value: '99150104', label: 'ADJOINT TECHNIQUE 4EME GRADE', arabicLabel: 'مساعد تقنى من الدرجة الرابعة' },
    { value: '98000102', label: 'ADMINISTRATEUR', arabicLabel: 'متصرف' },
    { value: '99130202', label: 'ADMINISTRATEUR DEUXIEME GRADE', arabicLabel: 'متصرف من الدرجة الثانية' },
    { value: '99130201', label: 'ADMINISTRATEUR PREMIER GRADE', arabicLabel: 'متصرف من الدرجة الأولي' },
    { value: '98000101', label: 'ADMINISTRATEUR PRINCIPAL', arabicLabel: 'متصرف ممتاز' },
    { value: '99130203', label: 'ADMINISTRATEUR TROISIEME GRADE', arabicLabel: 'متصرف من الدرجة الثالثة' },
    { value: '10000201', label: 'MAITRE DE CONFERENCES', arabicLabel: 'أســتاذ محاضر' },
    { label: 'MAITRE DE CONFERENCES GRADE A', arabicLabel: 'أستاذ محاضر الدرجة أ' },
    { label: 'MAITRE DE CONFERENCES GRADE B', arabicLabel: 'أستاذ محاضر الدرجة ب' },
    { label: 'MAITRE DE CONFERENCES GRADE C', arabicLabel: 'أستاذ محاضر الدرجة ج' },
    { label: 'MAITRE DE CONFERENCES GRADE D', arabicLabel: 'أستاذ محاضر الدرجة د' },
    { value: '99100304', label: 'PROF DE L\'ENSEIGNEMENT SUP ASSISTANT GRADE A (N.S)', arabicLabel: 'أستاذ التعليم العالي مساعد الدرجة أ' },
    { value: '99100303', label: 'PROF DE L\'ENSEIGNEMENT SUP ASSISTANT GRADE B (N.S)', arabicLabel: 'أستاذ التعليم العالي مساعد الدرجة ب' },
    { value: '99100302', label: 'PROF DE L\'ENSEIGNEMENT SUP ASSISTANT GRADE C (N.S)', arabicLabel: 'أستاذ التعليم العالي مساعد درجة ج' },
    { value: '99100301', label: 'PROF DE L\'ENSEIGNEMENT SUP ASSISTANT GRADE D (N.S)', arabicLabel: 'أستاذ التعليم العالي مساعد الدرجة د' },
    { value: '11090302', label: 'PROFESSEUR DE L\'ENS SECOND QUALIF 1ER GRADE', arabicLabel: 'استاذ التعليم الثانوي التأهيلي من د.الأولى' },
    { value: '11090303', label: 'PROFESSEUR DE L\'ENS SECOND QUALIF 2EME GRADE', arabicLabel: 'استاذ التعليم الثانوي التأهيلي من د.الثانية' },
    { value: '11090301', label: 'PROFESSEUR DE L\'ENS SECOND QUALIF GRADE PRINCIPAL', arabicLabel: 'استاذ التعليم الثانوي التأهلي من د.الممتازة' },
    { value: '99100103', label: 'PROFESSEUR DE L\'ENSEIGNEMENT SUP GRADE A (N.S)', arabicLabel: 'أستاذ التعليم العالي الدرجة أ' },
    { value: '99100102', label: 'PROFESSEUR DE L\'ENSEIGNEMENT SUP GRADE B (N.S)', arabicLabel: 'أستاذ التعليم العالي الدرجة ب' },
    { value: '99100101', label: 'PROFESSEUR DE L\'ENSEIGNEMENT SUP GRADE C(N.S)', arabicLabel: 'أستاذ التعليم العالي الدرجة ج' },
    { label: 'PROFESSEUR DE L\'ENSEIGNEMENT SUP GRADE D(N.S)', arabicLabel: 'أستاذ التعليم العالي الدرجة د' },
    { value: '10020103', label: 'PROFESSEUR DE L\'ENSEIGNEMENT SUPERIEUR GRADE A', arabicLabel: 'أستاذ التعليم العالي الدرجة أ' },
    { value: '10020102', label: 'PROFESSEUR DE L\'ENSEIGNEMENT SUPERIEUR GRADE B', arabicLabel: 'أستاذ التعليم العالي الدرجة ب' },
    { value: '10020101', label: 'PROFESSEUR DE L\'ENSEIGNEMENT SUPERIEUR GRADE C', arabicLabel: 'أستاذ التعليم العالي الدرجة ج' },
    { value: '10020203', label: 'MAITRE DE CONFERENCE HABILITE GRADE A', arabicLabel: 'أستاذ محاضر مؤهل الدرجة أ' },
    { value: '99100202', label: 'MAITRE DE CONFERENCE HABILITE GRADE B', arabicLabel: 'أستاذ  محاضر مؤهل الدرجة ب' },
    { value: '10020201', label: 'MAITRE DE CONFERENCE HABILITE GRADE C', arabicLabel: 'أستاذ  محاضر مؤهل الدرجة ج' },
    { label: 'MAITRE DE CONFERENCE HABILITE GRADE D', arabicLabel: 'أستاذ  محاضر مؤهل الدرجة د' },
    { value: '99040007', label: 'TECHNICIEN DE 2 EME GRADE', arabicLabel: 'تقني من الدرجة الثانية' },
    { value: '99040003', label: 'TECHNICIEN DE 2 EME GRADE (ANC)', arabicLabel: 'تقني من الدرجة الثانية' },
    { value: '99040008', label: 'TECHNICIEN DE 3 EME GRADE', arabicLabel: 'تقني من الدرجة الثالثة' },
    { value: '99040009', label: 'TECHNICIEN DE 4 EME GRADE', arabicLabel: 'تقني من الدرجة الرابعة' },
    { value: '99040001', label: 'TECHNICIEN GRADE PRINCIPAL (ANC)', arabicLabel: 'تقني الدرجة الممتازة' },
    { value: '99040006', label: 'TECHNICIEN PREMIER GRADE', arabicLabel: 'تقني من الدرجة الأول' },
    { value: '99040002', label: 'TECHNICIEN PREMIER GRADE(ANC)', arabicLabel: 'تقني من الدرجة الأولى' }
];

export default Grades;
