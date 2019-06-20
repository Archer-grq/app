$(function () {
    $("#clearcar").click(function () {
        localStorage.clear();
        console.log("清空购物车");
        window.location.reload()

    })

    $("#add").click(function () {
        var num=parseInt($("#dzxNum").val())+1;
        $("#dzxNum").val(num)
        update(num)
    })
    $('#ddd').bind('click',function () {
        var num=parseInt($("#dzxNum").val());
        if(num>0){
            num-=1;
        }
        $("#dzxNum").val(num)
        update(num)
    })
})
//bw.b
function update(num) {
    if(localStorage.getItem("shopcar")==undefined||localStorage.getItem("shopcar")==null){
        var shopcar="[]"
        localStorage.setItem("shopcar",shopcar)
    }
    var shopcarInfo=JSON.parse(localStorage.getItem("shopcar"))
    if(shopcarInfo.length==0){
        var shop1={"shop":"bw","product":"b","taste":"无","num":num,"money":199}
        shopcarInfo.push(shop1)
    }else{
        var flag=true
        for(var i=0;i<shopcarInfo.length;i++){
            if(shopcarInfo[i].shop=="bw"&&shopcarInfo[i].product=="b"){
                shopcarInfo[i].num=num
                console.log("bw.b")
                flag=false
                break;
            }
        }
        if(flag){
            var shop2={"shop":"bw","product":"b","taste":"无","num":num,"money":199}
            shopcarInfo.push(shop2)
        }
    }
    console.log(shopcarInfo)
    var shopcarstr=JSON.stringify(shopcarInfo)
    localStorage.setItem("shopcar",shopcarstr)
    console.log(JSON.parse(localStorage.getItem("shopcar")))
    showcar()
}
//bw.a
function addshop(){
    if(localStorage.getItem("shopcar")==undefined||localStorage.getItem("shopcar")==null){
        var shopcar="[]"
        localStorage.setItem("shopcar",shopcar)
    }
    var shopcarInfo=JSON.parse(localStorage.getItem("shopcar"))
    //获取选中的单选按钮
    var la=$("#a input[name=la]:checked").val()
    if(shopcarInfo.length==0){
        var shop1={"shop":"bw","product":"a","taste":la,"num":1,"money":188}
        shopcarInfo.push(shop1)
    }else{
        var i=0;
        var flag=true
        for(i=0;i<shopcarInfo.length;i++){
            if(shopcarInfo[i].shop=="bw"&&shopcarInfo[i].product=="a"&&shopcarInfo[i].taste==la){
                var num=shopcarInfo[i].num+=1
                console.log(4545)
                flag=false
                break;
            }
        }
        if(flag){
            var shop2={"shop":"bw","product":"a","taste":la,"num":1,"money":188}
            shopcarInfo.push(shop2)
        }
    }
    console.log(shopcarInfo)
    var shopcarstr=JSON.stringify(shopcarInfo)
    localStorage.setItem("shopcar",shopcarstr)
    console.log(JSON.parse(localStorage.getItem("shopcar")))
    alert("添加购物车成功")
    showcar()
    // 获取单选框
    // $("#a input[name=la]").each(function (i,e) {
    //     console.log($(e).val())
    // })
}


function showcar() {
    // console.log("hello")
    var innerhtml=""
    var shopinfo=JSON.parse(localStorage.getItem("shopcar"));
    if(shopinfo==null||shopinfo==undefined){
        var shopcar="[]"
        localStorage.setItem("shopcar",shopcar)
    }else{
        var totalmoney=0
        for(var i=0;i<shopinfo.length;i++){
            var shop=""
            var product=""
            var taste=""
            var money=0
            var num =shopinfo[i].num
            // console.log(shopinfo[i])
            if(shopinfo[i].shop=="bw"){
                shop="霸王海鲜";
                if(shopinfo[i].product=="a"){
                    product="清焖大虾";
                    if(shopinfo[i].taste==0){
                        taste="不辣";
                    }else if(shopinfo[i].taste==1){
                        taste="中辣";
                    }else if(shopinfo[i].taste==2){
                        taste="特辣";
                    }
                }
                if(shopinfo[i].product=="b"){
                    product="大闸蟹";
                }
            }
            money=shopinfo[i].money*shopinfo[i].num
            innerhtml+="<tr><td>"+shop+"</td><td>"+product+"</td><td>"+taste+"</td><td>"+num+"</td><td>"+money+"</td></tr>"
            totalmoney+=money;
        }
        $("#tbody").html(innerhtml)
        $("#totalmoney").html("￥"+totalmoney)

    }

}


$(document).on("pagecreate","#order",function(){
    console.log("pagecreate")
    showcar()
});

