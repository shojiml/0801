/* image clossFade */

// 初期化
function init_rotator() {
	
	// 要素は存在するか
	if(!$('#rotator').length) {
		
		// 存在しない場合は終了する
		return;
	}

	// 入れ替えの速度
	var speed = 2000;

	// 一時停止設定
	var pause = false;

	// 入れ替え関数
	function rotate(element) {

		// ユーザーが操作を行った場合は停止する
		if (pause) {
			return;
		}

		// 次の<li>または最初の<li>
		var $next_li = $(element).next('li').length ?
			$(element).next('li') :
			$('#rotator li:first');
	
		// 次の制御リンクまたは最初の制御リンク
		var $next_a =
			$('#rotator_controls a.current').parent('li').next('li').length ?
			$('#rotator_controls a.current').parent('li').find('a') :
			$('#rotator_controls a.first');
	
		// アニメーション
		$('#rotator_controls a.current').removeClass('current');
		$next_a.addClass('current');
		
		// 続行する
		function doIt() {
			rotate($next_li);
		}
		
		// <li>をフェードアウトする
		$(element).fadeOut(speed);
		
		// 次の<li>を表示する
		$($next_li).fadeIn(speed, function(){
		
			// 少し間を置く
			setTimeout(doIt, speed);
	
		});
	
	}
	
	// Clickイベントリスナーを追加する
	$('#rotator_controls a').click(function() {
	
		// ボタンのテキストを変更する
		$('#rotator_play_pause').html('PLAY');
		
		// ターゲットを表示し、他の<li>を非表示にする
		$($(this).attr('href')).show().siblings('li').hide();
		
		// class="current" を追加し、他の<li>から削除する
		$(this).addClass('current').parent('li').siblings('li').find('a').removeClass('current');;
		
		// アニメーションを停止する
		pause = true;
		
		// リンクをたどらない
		this.blur();
		return false;
		
	});
	
	// アニメーションの停止と再生
	$('#rotator_play_pause').click(function() {
		
		// どちらのボタンがクリックされたか
		if ($(this).html() === 'PAUSE') {
		
			// 画像の入れ替えを停止する	
			pause = true;
			
			//テキストを変更する
			$(this).html('PLAY');
			
		} else {
		
			//class="pause"を削除する
			pause = false;
			
			//入れ替えを開始する
			rotate('#rotator li:visible:first');
			
			//テキストを変更する
			$(this).html('PAUSE');
		}
		
		// リンクをたどらない
		this.blur();
		return false;
			
	});
		
	//最初の<li>以外は非表示にする
	$('#rotator li:first').siblings('li').hide();
		
	// ページが読み込まれるまで待つ
	$(window).load(function(){
		
	//入れ替えを開始する
	rotate($('#rotator li:visible:first'));
		
	});
		
}
	
	// 動的な機能を開始する
	$(document).ready(function(){
		init_rotator();
	});
