<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'echelon',
        'echele',
        'indice',
        'grade',
        'date',
    ];

    // Relations
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
