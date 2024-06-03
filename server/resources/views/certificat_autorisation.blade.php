<x-app-layout>
    <x-slot name="header">
        <a href="{{ route('add_prof') }}" class="btn btn-info"> Ajouter </a>
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <h1> طلب رخصة مغادرة التراب الوطني </h1>
            <br>
            <br>
            <p>الاسم الكامل: {{ $professeur->nom }}</p>
            <p>تطوان في : {{ $professeur->date_mouvement }}</p>
            <p>رقم التأجير : {{ $professeur->ppr }}</p>
            <p>الإطار: {{ $professeur->grade }}</p>
            <br>
            <p>إلى السيد عميد كلية أصول الدين – تطوان –</p>
            <p>الموضوع : طلب رخصة مغادرة التراب الوطني</p>
            <br>
            <p>سلام تام بوجود مولانا الإمام المؤيد بالله</p>
            <p>وبعد، أنا الموقع أسفله السيد (ة): ....................................... بصفتي : ................................ بكلية أصول الدين بتطوان، أطلب من سيادتكم الموقرة تمكيني من رخصة مغادرة التراب الوطني وذلك من الفترة الممتدة ما بين :............................................. و ................................................................</p>
            <p>وأحيطكم علما أن هذه المغادرة تأتي في إطار: ............................................................................................................................</p>
            <p>...................................................................................................................................</p>
            <p>وفي انتظار ردكم على طلبي، تقبلوا مني سيدي العميد أسمى عبارات التقدير والاحترام.</p>
            <p>توقيع:</p>
            <br>
            <button class="btn btn-danger" onclick="window.print()">Imprimer le Certificat</button>
        </div>
    </div>
</x-app-layout>