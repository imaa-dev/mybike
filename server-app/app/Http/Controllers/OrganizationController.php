<?php

namespace App\Http\Controllers;

use App\Http\Services\OrganizationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationController extends Controller
{

    protected OrganizationService $organizationService;

    public function __construct(OrganizationService $organizationService)
    {
        $this->organizationService = $organizationService;
    }
    public function create()
    {
        return Inertia::render('organization');
    }

    public function store(Request $request): RedirectResponse
    {
        $res =  $this->organizationService->create($request);
        return redirect()->back()->with('message', __($res['message']));
    }
}
