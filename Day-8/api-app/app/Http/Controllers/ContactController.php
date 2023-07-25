<?php

namespace App\Http\Controllers;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
  
    public function index()
    {
        $products = Contact::all();
      return view ('contacts.index')->with('contacts', $products);
    }
    
    public function create()
    {
        return view('contacts.create');
    }
   
    public function store(Request $request)
    {
        $input = $request->all();
        Contact::create($input);
        return redirect('contacts')->with('flash_message', 'Price Addedd!');  
    }
    
    public function show($id)
    {
        $product = Contact::find($id);
        return view('contacts.show')->with('contacts', $product);
    }
    
    public function edit($id)
    {
        $product = Contact::find($id);
        return view('contacts.edit')->with('contacts', $product);
    }
  
    public function update(Request $request, $id)
    {
        $product = Contact::find($id);
        $input = $request->all();
        $product->update($input);
        return redirect('contacts')->with('flash_message', 'Price Updated!');  
    }
   
    public function destroy($id)
    {
        Contact::destroy($id);
        return redirect('contacts')->with('flash_message', 'Price deleted!');  
    }
}
