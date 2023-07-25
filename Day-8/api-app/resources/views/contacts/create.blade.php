@extends('contacts.layout')
@section('content')
 
<div class="card">
  <div class="card-header">Add Item Page</div>
  <div class="card-body">
      
  <form action="{{ url('contacts') }}" method="post">
    {!! csrf_field() !!}
    <label>Name</label><br>
    <input type="text" name="name" id="name" class="form-control"><br>
    <label>Price</label><br>
    <input type="number" name="price" id="price" class="form-control"><br>
    <label>Type</label><br>
    <input type="text" name="type" id="type" class="form-control"><br>
    <input type="submit" value="Save" class="btn btn-success"><br>
  </form>
   
  </div>
</div>
 
@stop