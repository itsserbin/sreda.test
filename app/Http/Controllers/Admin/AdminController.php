<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Inertia\Response;

class AdminController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    final public function dashboard(): Response
    {
        return Inertia::render('Admin/Dashboard');
    }
}
