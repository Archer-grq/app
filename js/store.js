$(function () {

    //清空购物车
    $("#clearcar").click(function () {
        localStorage.clear();
        window.location.reload()

    })

    //bw.b增加商品
    $("#add").click(function () {
        var num=parseInt($("#dzxNum").val())+1;
        $("#dzxNum").val(num)
        shopupdate(num,"bw","b","",199,false)
    })

    //bw.b减少商品
    $('#ddd').bind('click',function () {
        var num=parseInt($("#dzxNum").val());
        if(num>0){
            num-=1;
        }
        $("#dzxNum").val(num)
        shopupdate(num,"bw","a","",188,false)
    })

    //bw.a 增加商品
    $("#addshop").click(function () {
        if(localStorage.getItem("shopcar")==undefined||localStorage.getItem("shopcar")==null){
            var shopcar="[]"
            localStorage.setItem("shopcar",shopcar)
        }
        var shopcarInfo=JSON.parse(localStorage.getItem("shopcar"))
        //获取选中的单选按钮
        var taste=$("#a input[name=la]:checked").val()
        shopupdate(1,"bw","a",taste,188,true)
        alert("添加购物车成功！！")
    })

    //fish.h1增加商品
    $("#fishaddshop").click(function () {
        if(localStorage.getItem("shopcar")==undefined||localStorage.getItem("shopcar")==null){
            var shopcar="[]"
            localStorage.setItem("shopcar",shopcar)
        }
        var shopcarInfo=JSON.parse(localStorage.getItem("shopcar"))
        //获取选中的单选按钮
        var taste=$("#layd input[name=la]:checked").val()

        shopupdate(1,"layd",'hl',taste,233,true)
        alert("添加购物车成功！！")
    })
    //fish.df增加商品
    $("#fishadd").click(function () {
        var num=parseInt($("#fishNum").val())+1;
        $("#fishNum").val(num)
        shopupdate(num,"layd",'df',"",99,false)
    })
    //fish.df减少商品
    $('#fishjian').bind('click',function () {
        var num=parseInt($("#fishNum").val());
        if(num>0){
            num-=1;
        }
        $("#fishNum").val(num)
        shopupdate(num,"layd",'df',"",99,false)
    })
})

//展示购物车
function showcar() {
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
            if(shopinfo[i].shop=="bw"){
                shop="霸王海鲜";
                if(shopinfo[i].product=="a"){
                    product="清焖大虾";
                    if(shopinfo[i].taste==0){
                        taste="不辣";
                    }else if(shopinfo[i].taste==1){
                        taste="微辣";
                    }else if(shopinfo[i].taste==2){
                        taste="特辣";
                    }
                }
                if(shopinfo[i].product=="b"){
                    product="大闸蟹";
                }
            }
            if(shopinfo[i].shop=="layd"){
                shop="恋湾鱼店";
                if(shopinfo[i].product=="hl"){
                    product="红烧鲤鱼";
                    if(shopinfo[i].taste==0){
                        taste="不辣";
                    }else if(shopinfo[i].taste==1){
                        taste="微辣";
                    }else if(shopinfo[i].taste==2){
                        taste="特辣";
                    }
                }
                if(shopinfo[i].product=="df"){
                    product="剁椒鱼头";
                }
            }
            money=shopinfo[i].money*shopinfo[i].num
            innerhtml+="<tr><td>"+shop+"</td><td>"+product+"</td><td>"+taste+"</td><td>"+num+"</td><td style='color:darkorange'>￥"+money+"</td></tr>"
            totalmoney+=money;
        }
        $("#tbody").html(innerhtml)
        $("#totalmoney").html("￥"+totalmoney)
        $("#talm1").html("￥"+totalmoney)
        $("#talm2").html("￥"+totalmoney)

    }

}

$(document).on("pagecreate","#order",function(){
    showcar()
});
$(document).on("pagecreate","#stroe",function(){
    showcar()
});
$(document).on("pagecreate","#fish",function(){
    showcar()
});
/**
 * 更新购物车信息
 * @param num 数量
 * @param shopname 店铺名
 * @param productname 产品名
 * @param taste 口味
 * @param money 单价
 * @param type true：增加， false:替换
 */
function shopupdate(num,shopname,productname,taste,money,type) {
    if(localStorage.getItem("shopcar")==undefined||localStorage.getItem("shopcar")==null){
        var shopcar="[]"
        localStorage.setItem("shopcar",shopcar)
    }
    var shopcarInfo=JSON.parse(localStorage.getItem("shopcar"))
    if(shopcarInfo.length==0){
        var shop1={"shop":shopname,"product":productname,"taste":taste,"num":num,"money":money}
        shopcarInfo.push(shop1)
    }else{
        var flag=true
        for(var i=0;i<shopcarInfo.length;i++){
            if(shopcarInfo[i].shop==shopname&&shopcarInfo[i].product==productname&&shopcarInfo[i].taste==taste){
                if(type==true){
                    shopcarInfo[i].num+=1
                    num=1//当时增加是赋值为 1；（只能一个一个增加）
                }else {
                    shopcarInfo[i].num=num
                }
                flag=false
                break;
            }
        }
        if(flag){
            var shop2={"shop":shopname,"product":productname,"taste":taste,"num":num,"money":money}
            shopcarInfo.push(shop2)
        }
    }
    var shopcarstr=JSON.stringify(shopcarInfo)
    localStorage.setItem("shopcar",shopcarstr)
    console.log(JSON.parse(localStorage.getItem("shopcar")))
    showcar()
}
