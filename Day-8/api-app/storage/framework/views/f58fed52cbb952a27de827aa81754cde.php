
<?php $__env->startSection('content'); ?>
 
<div class="card">
  <div class="card-header">Add Item Page</div>
  <div class="card-body">
      
  <form action="<?php echo e(url('contacts')); ?>" method="post">
    <?php echo csrf_field(); ?>

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
 
<?php $__env->stopSection(); ?>
<?php echo $__env->make('contacts.layout', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Neobyte-Solution-Internship\first-week\Day-8\api-app\resources\views/contacts/create.blade.php ENDPATH**/ ?>