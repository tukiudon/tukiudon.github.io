/*問題文配列*/
var sentence = new Array();
sentence[0] = [ ["<img src='img/20191211_mondai1_1.png'>","<img src='img/20191211_mondai1_2.png'>","<img src='img/20191211_mondai1_3.png'>"]/*"あなたはクラスが一緒で時々話をするAちゃんから下記のようなLINEが来ました。「いきなりごめんね～今時間ある？」ちょうど暇だったこともあり、「あるよ」とあなたは答えました。すると・・・「近くのコンビニでiTunesのプリペイドカード５０００円分買ってきてほしい～🙏」と来ました。Aちゃんはよくゲームに課金をしている子でした。今必要だけど諸事情で行けないから頼んできたんだなと思いました。しかしここでふと、「最近世間で騒がれているLINEの乗っ取り詐欺なのではないか」とあなたは考えました。あなたが優先してとるべき行動は次の３つのうちどれ？"*/,
"①そのままAちゃんと会話をして乗っ取り詐欺か確かめる",
"②電話やメールなどLINE以外の手段でこのことを聞く",
"③気になったが、深く考えずプリペイドカードを買って写真を送る。",/*解答*/
2, 
"<img src='img/explanation0.png'>",
"不正解。また、新たな詐欺に巻き込まれてしまう危険性があります。",
"正解。LINE以外の連絡手段がとれる場合はそちらできちんと聞きましょう。また、可能であれば一時的にブロックをしておくと安全です。",
"不正解。１番やってはいけない行為です。詐欺の被害にあってしまいます。"];
sentence[1] = [
 ["<img src='img/20191211_mondai3_1.png'>","<img src='img/20191211_mondai3_2.png'>"],
"①メッセージを無視する。",
"②一度○△銀行にメールなどで問い合わせをし、本当かどうか聞く。",
"③使えないと困るのでURLから飛んで、口座再開の手続きをする。",
3,
"<img src='img/explanation1.png'>",
"不正解。",
"不正解。",
"正解。本来銀行の暗証番号などが必要になることをSMSなどで聞いてくることはありえません。"];
sentence[2] = [
    ["<img src='img/20191211_mondai5.png'>"]
 ,
"①匿名性が高く、Dちゃんが書いたとバレない",
"②ネット上で他人を誹謗中傷する行為は、犯罪に当たる場合が多い。",
"③ただの日々の日記にあたる",
2,
"<img src='img/explanation2.png'>",
"不正解。",
"正解。法律違反として名誉棄損で刑事告訴される可能性があります。",
"不正解。"];

/*選択師配列*/
/*var choise = new Array();
choise = [ 
    ["a", "b", "c"], 
    ["d", "e", "f"]
    ];*/

/*解答配列*/
/*var answer = new Array();
answer = [
    ["ああああああああああああああああああああああああああああああああああああああああああ"],
    ["いいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいい"]
];*/


/*初期設定*/
var datalist = new Array();
var cur;/*問題数のカウント*/
var count;/*問題ページのカウント*/  
var ansers;/*解答を入れる配列の準備*/
var n, s ;
var result ;/*点数*/
var li_cur = 3;/*表示する選択肢の数*/

var que = document.getElementById('question');/*現在の問題数の表示*/ 

var listdis = document.getElementById("list");/*問題時の選択肢作成*/

var listans = document.getElementById("list_answer");/*解答時の選択肢作成*/

var sent = document.getElementById('sent');/*問題文表示*/

var res = document.getElementById("result_score");/*スコア表示*/

var rclic = document.getElementById("rightclick");/*次の問題へボタン*/

var page = document.getElementById('page');/*問題文のページ表示*/

var next = document.getElementById('next');/*次の問題ページ*/

var prev = document.getElementById('prev');/*前の問題ページ*/

var n_sentence = sentence.length;/*配列の数格納*/

var comment = document.getElementById('list_commentary');/*解答の選択肢別解答*/

var hint = document.getElementById('hint');

var modal = document.getElementById('modal');

var top_jump = document.getElementById('top_jump');

modal.style.display = 'none';

/*問題をランダムに並べる*/
for(var i = 0; i < n_sentence; i += 1){
    var num = Math.floor(Math.random() * sentence.length);
    var t = sentence[--n_sentence];
    sentence[n_sentence] = sentence[num];
    sentence[num] = t;

}

sentence.forEach( function( value ) {console.log( value );});

/*var new_quiz = [];
for(var i = 0; i < n_sentence; i += 1) {
    var num = Math.floor(Math.random() * sentence.length);
    new_quiz.push(sentence[num]) ;
     sentence.slice(num);

};
console.log(sentence);
console.log(new_quiz);*/
setReady();

//初期設定
function setReady() {
    cur = 0; //問題番号 
    result = 0;//初期スコア
    ansers = new Array(); //解答記
    count = 0;
    top_jump.style.display = 'none';
    //最初の問題
    quiz();//クイズ関数
}


listdis.style.display = 'block';//選択肢リスト表示
rclic.style.visibility = "hidden";//次の問題へボタン非表示

/*全体クイズ表示関数*/
function quiz() {
que.textContent = (cur + 1) + ' / ' + sentence.length + " 問 ";//現在の問題数表示

    
sent.innerHTML = sentence[cur][0][0];//問題文表示

/*問題文のページ数、次のページへボタン、前のページへボタン表示*/
page.style.display = 'block';
next.style.display = 'block';
prev.style.display = 'block';


/*問題文のページ処理関数*/
var pageNum = function () {
 page.textContent =　(count + 1) + ' / ' + sentence[cur][0].length;//問題文のページ数表示
}

var changeimage = function (num) {
    if (count + num < sentence[cur][0].length && count + num >= 0) {
        count += num;
        sent.innerHTML = sentence[cur][0][count];
        pageNum();
    }
}

next.onclick = function () {
    changeimage(1)
};

prev.onclick = function () {
    changeimage(-1)
};
    
pageNum();
    
hint.onclick = function(){
    
 if(modal.style.display=="block")
 {modal.style.display = 'none'; }
    else{modal.style.display = 'block'; }
}

window.addEventListener('click', function(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
});

/*選択肢作成*/
    s = "";
    for (n = 1; n <= li_cur; n++) {
        s += "<input type='button' name=" + n + " id='lis_s' value=" + sentence[cur][n] + " onclick = anser(" + n + ");>";

    }
    listdis.innerHTML = s;
}

/*選択肢ボタン押したときの処理関数*/
function anser(num) {

/*問題文のページ数、次のページへボタン、前のページへボタン表示*/
    
page.style.display = 'none';
next.style.display = 'none';
prev.style.display = 'none';
page.textContent =　1 + '/' + sentence[cur][0].length;
sent.innerHTML = sentence[cur][0][0];
    
var s,t,u; 
    //答え合わせ
    if (num == sentence[cur][li_cur + 1]) {
        //正解
        s = "<div id='correct'>正解</div> <br><div id='explanatory'> " + sentence[cur][li_cur + 2] + "</div>";
        ansers[cur] = "○";
        
        t = "";
        result += 1;
        for (var i = 1; i <= li_cur; i++) {
        t += "<input type='button' name=" + i + " id='lis_answer' value=" + sentence[cur][i] + " onclick = commentary("+ i +");><br><div id = 'commentary'>" + sentence[cur][li_cur + 2 +  + i ] + "</div><br>";
        

        listans.innerHTML = t;
        listans.style.display = 'block';
    }
        

/*function commentary(num){
        u ="";
        u += sentence[cur][li_cur + 2 + num];
        comment.innerHTML = u;
}*/
    } else {
        //不正解
        s = "<div id='incorrect'>不正解</div> <br><div id='explanatory'> " + sentence[cur][li_cur + 2] + "</div>";
        ansers[cur] = "×";
        
        t = "";
        for (var i = 1; i <= li_cur; i++) {
        t += "<input type='button' name=" + i +  " id='lis_answer' value=" +sentence[cur][i] +" onclick = commentary();><br><div id = 'commentary'>" + sentence[cur][li_cur + 2 +  + i ] + "</div><br>";
        listans.innerHTML = t;
        listans.style.display = 'block';
    }
    /*function commentary(){
        u ="";
        u += "<div>new_quiz[cur][li_cur + 2 + " + 1 + "]</div>";
        comment.innerHTML = u;
        console.log(u);
    }*/

    }
    sent.innerHTML = s;
    
    
    //sent.textContent = sentence[cur][5];

    listdis.style.display = 'none';
    rclic.style.visibility = "visible";
    cur++;
    /*
	if (cur < sentence.length) {
		quiz();
	} else {
		//終了
		sent.innerHTML = "";
		listdis.innerHTML = "";
	}*/
    
/*押したときの処理関数*/
        rclic.onclick = function () {
        count = 0;
        rclic.style.visibility = "hidden";
        listdis.style.display = 'block';
        listans.style.display = 'none';
        
        if (cur < sentence.length) {
            quiz();
        } else {
            top_jump.style.display = 'block';
             hint.style.display ="none";
            //終了
            que.textContent = "成績発表";
            //1行目
            s = "<table><tr><th>問題</th><br>";
            for (n = 0; n < sentence.length; n++) {
                s += "<td>" + (n + 1) + "</td>";
            }
            s += "</tr>";
            //2行目
            s += "<br><tr><th>判定</th><br>";
            for (n = 0; n < sentence.length; n++) {
                s += "<td>" + ansers[n] + "</td>";
            }
            s += "</tr>";
            s += "</table>";
            sent.innerHTML = s;
            res.textContent = "あなたのスコアは"　+ result +  "点です。";
            listdis.innerHTML = "";
            
            saveData();
            
 var twi= document.getElementById("tweet");
 var url = "https://note.mu/ugok_girls";
  
twi.innerHTML = "<a href='http://twitter.com/share?url=" + url + "&text=わたしのスコアは"　+ result +  "点です&hashtags=りてらしーこれくしょん'>" + "<span id ='tweet__square'><i class= 'fab fa-twitter'></i></span> 結果をツイートする</a>";
        };
    };

};

var count = 0;

function saveData(){

datalist.push(result);
    
    
count += 1;
    
var setjson = JSON.stringify(datalist);
localStorage.setItem("datalist" + count , setjson);// -> "[object Object]"

 // -> {"data1":"hoge1", "data2":"hoge2"}

for(key in localStorage){
    console.log(key);
}
};

 /*   var ctx = document.getElementById("chart").getContext("2d");
    var myChart = new CanvasJS.Chart(ctx, {
    type: 'line',
    data: {
      labels: ['8月1日', '8月2日', '8月3日', '8月4日', '8月5日', '8月6日', '8月7日'],
      datasets: [
        {
          label: '最高気温(度）',
          data: [35, 34, 37, 35, 34, 35, 34, 25],
          borderColor: "rgba(255,0,0,1)",
          backgroundColor: "rgba(0,0,0,0)"
        },
        {
          label: '最低気温(度）',
          data: [25, 27, 27, 25, 26, 27, 25, 21],
          borderColor: "rgba(0,0,255,1)",
          backgroundColor: "rgba(0,0,0,0)"
        }
      ],
    },
    options: {
      title: {
        display: true,
        text: '気温（8月1日~8月7日）'
      },
      scales: {
        yAxes: [{
          ticks: {
            suggestedMax: 40,
            suggestedMin: 0,
            stepSize: 10,
            callback: function(value, index, values){
              return  value +  '度'
            }
          }
        }]
      },
    }
  });*/

/*var sent = document.getElementById('sent');
var listdis = document.getElementById("list");
var rclic = document.getElementById("rightclick");

rclic.style.visibility ="hidden";

sent.textContent = sentence[cur];


for (var i = 0; i < choise[cur].length; i++)
{listdis.style.visibility ="visible";
var li = document.createElement('li');
li.textContent = choise[cur][i];
listdis.appendChild(li);
};

listdis.onclick = 
    function () {
    sent.textContent = answer[cur];
    listdis.style.visibility ="hidden";
    rclic.style.visibility ="visible";                                          
                 
};


rclic.onclick = 
    function(){
    if(cur < sentence.length-1 ){cur += 1;
    que.textContent =(cur + 1) + '/' + sentence.length + "問";
    sent.textContent = sentence[cur];
    console.log(cur);
                                 
for (var j = 0 ;  j < choise[cur].length; j++)
{ listdis.style.visibility ="visible";
 var li = document.createElement('li');
 li.textContent = choise[cur][j];
 listdis.appendChild(li);
};  
    rclic.style.visibility ="hidden";
                                };
};

/*var rclic = document.getElementById("rightclick");
var lclic = document.getElementById("leftclick");
rclic.style.visibility ="visible";
lclic.style.visibility ="visible";*/


/*var listdis = document.getElementById("list");

var pageNum = function () {
document.getElementById('question').textContent =
        (cur + 1) + '/' + sentence.length + "問";
}

var changesentence = function (num) {
    if (cur + num < sentence.length && cur + num >= 0) {
        cur += num;
        document.getElementById('sent').textContent = sentence[cur];*/
/*選択肢*/

/*for (var i = 0; i < choise[cur].length; i++)
{listdis.style.visibility ="visible";
var li = document.createElement('li');
li.textContent = choise[cur][i];
listdis.appendChild(li);
};
        
};

  document.getElementById('list').onclick = function () {document.getElementById('sent').textContent = answer[cur];
    listdis.style.visibility ="hidden";
};
        pageNum();
    };

document.getElementById("rightclick").onclick = function () {
    changesentence(1)
    if(cur > sentence.length){
       rclic.style.visibility ="hidden";
       }
    if(cur != sentence.length){rclic.style.visibility ="visible";};
};

document.getElementById("leftclick").onclick = function () {
    changesentence(-1)
if(cur < 0){
  lclic.style.visibility ="hidden";}
if(cur != 0){
    lclic.style.visibility ="visible";
    };
};

pageNum();*/



/*選択肢リスト*/
/*var choise = [
["a", "b", "c"],
["d", "e", "f"]
    ];

var listdis = document.getElementById("list");
listdis.style.visibility ="visible";

for (var i = 0; i < choise.length; i++
{var li = document.createElement('li');
li.textContent = choise[i];
listdis.appendChild(li);
};

document.getElementById('list').onclick = function () {
    bun.textContent = answer[quenum];
    listdis.style.visibility ="hidden";
};*/


/*

let images = ['img/firstview1.jpg', 'img/firstview2.jpg', 'img/firstview3.jpg'];

let cur = 0;

let pageNum = function () {
    document.getElementById('page').textContent =
        (cur + 1) + '/' + images.length;
}

let changeimage = function (num) {
    if (cur + num < images.length && cur + num >= 0) {
        cur += num;
        document.getElementById('main_image').src = images[cur];
        pageNum();
    }


}

document.getElementById('next').onclick = function () {
    changeimage(1)
};

document.getElementById('prev').onclick = function () {
    changeimage(-1)
};

pageNum();












let pageNum = function () {
    document.getElementById('page').textContent =
        (cur + 1) + '/' + images.length;
}

let changeimage = function (num) {
    if (cur + num < images.length && cur + num >= 0) {
        cur += num;
        document.getElementById('main_image').src = images[cur];
        pageNum();
    }


}

document.getElementById('next').onclick = function () {
    changeimage(1)
};

document.getElementById('prev').onclick = function () {
    changeimage(-1)
};

pageNum();*/
