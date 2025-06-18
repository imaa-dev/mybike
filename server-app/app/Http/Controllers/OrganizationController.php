<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrganizationRequest;
use App\Http\Services\OrganizationService;
use App\Models\Organization;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OrganizationController extends Controller
{

    protected OrganizationService $organizationService;

    public function __construct(OrganizationService $organizationService)
    {
        $this->organizationService = $organizationService;
    }
    public function list(Request $request)
    {
        $organizations = Organization::where('user_id', $request->user()->id)->with('file')->get();
        return Inertia::render('forms/listOrganization',[
            'organizations' => $organizations,
        ]);
    }
    public function create()
    {
        return Inertia::render('forms/createOrganizationForm');
    }
    public function show(Request $request)
    {
        $organization = Organization::where('user_id', $request->user()->id)->where('active', true)->with('file')->first();
        return Inertia::render('organization', [
            'organization' => $organization
        ]);
    }
    public function store(StoreOrganizationRequest $request)
    {
        $res =  $this->organizationService->create($request);
        session()->flash('message', $res['message']);
        return redirect()->route('organization.list.view');
    }
    public function getUpdate(Organization $organization)
    {
        $organizationFile = Organization::where('id', $organization->id)->with('file')->first();

        return Inertia::render('forms/editOrganizationForm',[
            'organizationUpdate' => $organizationFile,
        ]);
    }
    public function update(StoreOrganizationRequest $request)
    {
        $res = $this->organizationService->update($request);
        session()->flash('message', $res['message']);
        return redirect()->route('organization.list.view');
    }

    public function delete(Request $request)
    {
        $res = $this->organizationService->delete($request);
        session()->flash('message', $res['message']);
        return redirect()->route('organization.list.view');
    }
}
