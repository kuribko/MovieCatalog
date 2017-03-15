
    function sortElementsInsideParent(parentSelector, itemSelector, selectedClass){
        var mylist = $(parentSelector);
        var listitems = mylist.children(itemSelector).get();
        listitems.sort(function(a, b) {
            if( $(a).hasClass(selectedClass) && !$(b).hasClass(selectedClass)){
                return -1;
            }else if( !$(a).hasClass(selectedClass) && $(b).hasClass(selectedClass)){
                return 1;
            }

            return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
        })
        $.each(listitems, function(idx, itm) { mylist.append(itm); });
    }

function filterOnClick(id, containerId, fieldName){
    var item = $("#"+id);
    var filterOnClass = "filterOn";

    if(item.hasClass(filterOnClass)){
        item.removeClass(filterOnClass);
    }else{
        item.addClass(filterOnClass);
    }

    // sort
    sortElementsInsideParent(containerId, "li", filterOnClass);

    // remove hidden
    $("#search input[type='hidden'][name='"+fieldName+"'] ").remove();

    // add hidden
    items = $(containerId).children("li.filterOn").get();
    items.forEach(function(elem){
        var value = elem.getAttribute("value")
        $("#search").append('<input type="hidden" name="'+fieldName+'" value="'+value+'"/>');
    })

    $("form#searchForm").submit();
}
