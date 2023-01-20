//판매량 높은 순으로 정렬하기
function sortBookByBookSold(bookDB){

    for(i=0;i<bookDB.length;i++){
        var maxNo = bookDB[i]["bookSold"]
        var maxIndex = i
        
        for(j=i;j<bookDB.length;j++){
            if(maxNo<bookDB[j]["bookSold"]){
                maxNo = bookDB[j]["bookSold"]
                maxIndex = j
            }
        }
        var temp = bookDB[i]
        bookDB[i] = bookDB[maxIndex]
        bookDB[maxIndex] = temp;
    }
}


// 번호 순으로 오름차순 정렬하기 (전체보기)
function sortBookByBookNo(bookDB){

}



module.exports = function(app){

    // main페이지
    app.get("/mainBook", function(req, res){ 
        var log = req.session.log;
        var bookDB = req.session.bookDB;
        var name = req.session.name;

        sortBookByBookSold(bookDB);

        var renderData = {	
            "log" : log,
            "name" : name,
            "bookDB" : bookDB
        };
        res.render("book/bookMain.ejs", renderData); 
    });


    //전체도서 보기 페이지(bookAllList)
    app.get("/bookAllList",function(req,res){
        //필요한 변수 지정 --> 저 페이지에 있어야할 것들이 무엇인가?
        var log = req.session.log     // 로그인을 한 경우 로그인이 되었다고 알려줘야하므로
        var bookDB = req.session.log
        var name = req.session.name
       
        //오름차순 정렬함수(bookDB)
        sortBookByBookNo(bookDB)

        //렌더링에 필요한 변수들 지정


        res.render("book/bookAllList.ejs",renderData)
    });
}