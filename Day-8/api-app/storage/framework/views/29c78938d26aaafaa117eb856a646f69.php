
<?php $__env->startSection('content'); ?>
 
<div class="card">
  <div class="card-header">Contactus Page</div>
  <div class="card-body">
      
      <form action="<?php echo e(url('contacts/' .$contacts->id)); ?>" method="post">
        <?php echo csrf_field(); ?>

        <?php echo method_field("PATCH"); ?>
        <input type="hidden" name="id" id="id" value="<?php echo e($contacts->id); ?>" id="id" />
        <label>Name</label></br>
        <input type="text" name="name" id="name" value="<?php echo e($contacts->name); ?>" class="form-control"></br>
        <label>Price</label></br>
        <input type="text" name="price" id="price" value="<?php echo e($contacts->price); ?>" class="form-control"></br>
        <label>Type</label></br>
        <input type="text" name="type" id="type" value="<?php echo e($contacts->type); ?>" class="form-control"></br>
        <input type="submit" value="Update" class="btn btn-success"></br>
    </form>
   
  </div>
</div>
 
<?php $__env->stopSection(); ?>
<?php echo $__env->make('contacts.layout', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Neobyte-Solution-Internship\first-week\Day-8\api-app\resources\views/contacts/edit.blade.php ENDPATH**/ ?>