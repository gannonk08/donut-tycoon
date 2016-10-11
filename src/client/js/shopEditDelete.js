(function() {
  'use strict';
  console.log('edit shop sanity check');

  //Delete Shop out of Database
  $(document).on('click', '.delete-btn', function() {
    const answer = confirm('Are you sure you want to remove this shop?');
    if (answer) {
        const $this = $(this);
        const shopID = $this.attr("data-id");
        console.log(shopID);
        $.ajax({
                type: 'DELETE',
                url: `/shops/${shopID}/delete`
            })
            .done((data) => {
                alert("Shop Deleted!");
                console.log(data);
            })
            .fail((err) => {
                console.log(err);
            });
    }
  });
  $(document).on('click', '.update-btn', function() {
  const $this = $(this);
  const shopID = $this.attr('data-id');
  const shopName = $this.attr('data-name');
  const shopCity = $this.attr('data-city');

  $('#input-id').val(shopID);
  $('#input-shopName').val(shopName);
  $('#input-shopCity').val(shopCity);
});
//submit updates
  $(document).on('submit', '#modal-form', function(e) {
      e.preventDefault();
      const $shopID = $('#input-id').val();
      const $updatedshopName = $('#name').val();
      const $updatedCity = $('#city').val();
      const payload = {
        name: $updatedshopName,
        city: $updatedCity
      };
      console.log(payload);
      $.ajax({
        type: 'PUT',
        url: `/shops/${$shopID}/edit`,
        data: payload
      })
      .done((data) => {
        $('#myModal').modal('toggle');
        location.reload();
        console.log(data);
      })
      .fail((err) => {
        location.reload();
        console.log(err);
      });
});
}());
