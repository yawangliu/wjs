$(function(){
    console.log("cscsad");
    console.log("发动机阿斯");
    $('[data-toggle="tooltip"]').tooltip();
    var items=$(".carousel-inner .item");
    $(window).on("resize",function(){
        var width=$(window).width();
        if(width>=768){
            items.each(function(index,value){
                var item=$(this);
                var imgSrc=item.attr("data-large-image");
                item.html($('<a href="javascript:;" class="pcImg"></a>').css("backgroundImage","url('"+imgSrc+"')"));
            });
        }else{
            items.each(function(index,value){
                var item=$(this);
                console.log(item);
                var imgSrc=item.attr("data-small-image");
                console.log(imgSrc);
                item.html('<a href="javascript:;" class="mobileImg"><img src="'+imgSrc+'" alt="..."></a>');
            })
        }
    }).trigger("resize")

    //����ƶ��˵Ļ�������

    var startX,endX;
    var carousel_inner=$(".carousel-inner")[0];
    carousel_inner.addEventListener("touchstart",function(e){
        startX= e.targetTouches[0].clientX;
    });
    carousel_inner.addEventListener("touchend",function(e){
        endX= e.changedTouches[0].clientX;
        if(endX-startX>0){
            $('.carousel').carousel('prev');
        }else if(endX-startX<0){
            $('.carousel').carousel('next');
        }
    })

    var ul=$(".wjs_product .nav");
    var lis=ul.find("li");
    var totalWidth=0;
    lis.each(function(index,value){
        totalWidth+=$(value).outerWidth(true);
    });
    ul.width(totalWidth);

    var myScroll = new IScroll('.tabs_parent', {
        scrollX: true,
        scrollY: false
    });

})