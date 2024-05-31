
<x-app-layout>
    <x-slot name="header">
        <a href="{{ route('add_prof') }}" class="btn btn-info"> Ajouter </a>
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        </h2>
    </x-slot>


    <div class="py-12">

        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <h1> شهادة العمل </h1>
            <br>
            <br>
            <p>يشهد عميد كلية أصول الدين بتطوان أن:</p>
            <p>- السيـــد (ة): {{ $professeur->nom }}</p>
            <p>- رقم البطاقة الوطنية : {{ $professeur->cin }}</p>
            <p>- رقم التأجير : {{ $professeur->ppr }}</p>
            <p>- الإطــــــار : {{ $professeur->grade }}</p>
            <p>يعمل بهذه الكلية.</p>
            <p>وحررت له (ها) هذه الشهادة بناء على طلبه (ها) قصد الإدلاء بها عند الاقتضاء.</p>
            <p>تطوان في : {{ $professeur->date_mouvement }}</p>
            <button class="btn btn-danger" onclick="window.print()">Imprimer le Certificat</button>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>

