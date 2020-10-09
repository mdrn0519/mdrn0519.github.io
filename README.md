# vue-calendar-for-beginner
Vue及びVuexの理解を目的として実施します。  
カレンダーとタスク保存機能を作成し、ローカル環境で見られるようにしてください。  
完了目標は5人日です。  

[完成見本](https://suke-bita.github.io/vue-calendar-for-beginner-example/)

## 使い方
```
yarn install
yarn dev
```

## ルール
- 確認するブラウザはPC Chromeだけでよいです
- html5で追加された要素を利用したセマンティクスを考慮せずともよい
- scssは[MindBEMding](https://github.com/manabuyasuda/styleguide/blob/master/how-to-bem.md)に沿って書くこと
- JavascriptはES6以上で書くこと
- VueのスタイルはCSS modulesを利用
- Vueのライブラリの利用でカレンダーやモーダルを作るのはダメです、自力で頑張ろう
- VueとVuexを利用する
- lintエラーはコメントアウト回避を極力しない
- レスポンシブ（極端にウィンドウを小さくした場合の崩れは考慮しなくてよい）

## 祝日API
祝日取得に利用するAPIはサードパーティでも自分で用意してもよい。  
サードパーティ製は以下のものがある。  
https://holidays-jp.github.io/

## カレンダー
月毎のレイアウトは「横7列、縦6行の合計42セル」にする。

1行目のセルには曜日も内包し、日曜日ではじまり土曜日で終わること。  

前後セルの余りには前後月の日付セルを表示し、背景色を変更すること。  

祝日APIを取得し、該当年月日のセルには日付名ラベルの追加すること。  
また、1行を越える場合は末尾を3点リーダーにする。  

カレンダーを月毎に切り替えるページャーを作成すること。  
ページャーの表示はYYYY年NN月にし、年月は加減算すること。

## タスク保存機能
カレンダーの日付セルを押下したら、1行テキストを入力できるモーダルを表示する。  
コンテンツは年月日、1行テキスト入力、保存ボタン、閉じるボタンをそれぞれ配置すること。

閉じるボタンもしくはモーダルの外側を押下するとモーダルが閉じる。

モーダルの表示・非表示はフェードインで行う。

テキストを入力して保存ボタンを押下したらカレンダーに入力したテキストのラベルが追加される。

セルに追加されたテキストラベルが1行を越える場合は末尾を3点リーダーにする。 

テキストラベルには削除ボタンをつけ、セルから削除できるようにする。

セルに表示されるタスクは2つまで、3つ以上は「他N件」のようなテキストを押下した場合、  
セルに全てのタスクが表示されて削除できることが可能にすること。

保存されたタスクはローカルストレージに保存し、再度ブラウザを開いた時に復元できるようにすること。
