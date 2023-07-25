@extends('contacts.layout')
@section('content')
 
 
<div class="card">
  <div class="card-header">Item Page</div>
  <div class="card-body">
   
 
        <div class="card-body">
        <h5 class="card-title">Name : {{ $contacts->name }}</h5>
        <p class="card-text">Price : {{ $contacts->price }}</p>
        <p class="card-text">Type : {{ $contacts->type }}</p>
  </div>
       
    </hr>
  
  </div>
</div>