<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Resources\ProjectResource;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;


class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Project::query();
        $name = $request->name;
        $status = $request->status;
        $sortField = $request->input("sorted","due_date");
        $direction = $request->input("direction","desc");
        if ($name) {
            $query->where("name","like","%". $name ."%");
        }
        if ($status) {
            $query->where("status", $status);
        }
        $projects = $query->orderBy($sortField,$direction)->paginate(10);
        return inertia("Projects/Index", ["projects"=> ProjectResource::collection($projects),"nameQuery"=>$name,"statusQuery"=>$status,"sortField"=>$sortField,"direction"=>$direction]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
