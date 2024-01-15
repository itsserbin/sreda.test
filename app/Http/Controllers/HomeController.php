<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    final public function home(): Response
    {
        return Inertia::render('Public/Home/Index');
    }
}
