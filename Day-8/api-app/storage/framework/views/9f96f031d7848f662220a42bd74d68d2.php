
<?php $__env->startSection('content'); ?>
 
 
<div class="card">
  <div class="card-header">Item Page</div>
  <div class="card-body">
   
 
        <div class="card-body">
        <h5 class="card-title">Name : <?php echo e($contacts->name); ?></h5>
        <p class="card-text">Price : <?php echo e($contacts->price); ?></p>
        <p class="card-text">Type : <?php echo e($contacts->type); ?></p>
  </div>
       
    </hr>
  
  </div>
</div>
<?php echo $__env->make('contacts.layout', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Neobyte-Solution-Internship\first-week\Day-8\api-app\resources\views/contacts/show.blade.php ENDPATH**/ ?>