<?php

namespace App\Services;
use App\Models\Task;

class TaskService {
    public function transform($name,$status,$sortField,$direction,$priority) {
        $query = Task::query();
        if ($name) {
            $query->where("name","like","%". $name ."%");
        }
        if ($status) {
            $query->where("status", $status);
        }
        if ($priority) {
            $query->where("priority", $priority);
        }
        $tasks = $query->orderBy($sortField,$direction)->paginate(10);
        return $tasks;
    }
}
