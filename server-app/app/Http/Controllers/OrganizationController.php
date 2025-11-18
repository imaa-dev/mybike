<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrganizationRequest;
use App\Models\Organization;
use App\Services\OrganizationService;
use Illuminate\Http\Request;
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
        $userId = $request->user()->id;
        $organizations = $this->organizationService->getByUserId($userId);
        return Inertia::render('organization/listOrganization',[
            'organizations' => $organizations['organizations'],
        ]);
    }
    public function create()
    {
        return Inertia::render('organization/createOrganization');
    }
    public function show(Request $request)
    {
        $userId = $request->user()->id;
        $organization = $this->organizationService->getActive($userId);
        return Inertia::render('organization/organization', [
            'organization' => $organization
        ]);
    }
    public function store(StoreOrganizationRequest $request)
    {
        $data = [
            'user_id' => $request->user()->id,
            'file' => $request->file('file'),
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'active' => $request->boolean('active'),
        ];
        $res =  $this->organizationService->create($data);
        session()->flash('message', $res['message']);
        return redirect()->route('organization.list.view');
    }
    public function getUpdate(Organization $organization)
    {
        $organizationFile = Organization::where('id', $organization->id)->with('file')->first();

        return Inertia::render('organization/editOrganization',[
            'organizationUpdate' => $organizationFile,
        ]);
    }
    public function update(StoreOrganizationRequest $request)
    {
        $data = [
            'id' => $request->input('id'),
            'user_id' => $request->user()->id,
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'active' => $request->boolean('active'),
        ];
        $file = $request->file('file');
        $res = $this->organizationService->update($data, $file);
        session()->flash('message', $res['message']);
        return redirect()->route('organization.list.view');
    }

    public function delete(Request $request)
    {
        $res = $this->organizationService->delete($request->id);
        return response()->json($res);
    }
}
