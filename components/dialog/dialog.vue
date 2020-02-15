<template>
	<view>
		<view v-show="isShow">
			<view class='wx-mask'></view>
			<view class='wx-dialog'>
				<view class='wx-dialog-title'>{{ title }}</view>
				<view class='wx-dialog-content'>{{ content }}</view>
				<view class='wx-dialog-footer'>
					<view class='wx-dialog-btn' @click='_cancelEvent'>{{ cancelText }}</view>
					<view class='wx-dialog-btn' @click='_confirmEvent'>{{ confirmText }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "dialog",
		data() {
			return {
				// 弹窗显示控制
				isShow: false
			};
		},
		props: {
			// 弹窗标题
			title: { // 属性名
				type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
				value: '标题' // 属性初始值（可选），如果未指定则会根据类型选择一个
			},
			// 弹窗内容
			content: {
				type: String,
				value: '弹窗内容'
			},
			// 弹窗取消按钮文字
			cancelText: {
				type: String,
				value: '取消'
			},
			// 弹窗确认按钮文字
			confirmText: {
				type: String,
				value: '确定'
			}
		},
		methods: {
			/*
			 * 公有方法
			 */

			hideDialog: function() {
				this.$data.isShow = !this.$data.isShow
			},
			//展示弹框
			showDialog: function() {
				this.$data.isShow = !this.$data.isShow
			},
			/*
			 * 内部私有方法建议以下划线开头
			 * triggerEvent 用于触发事件
			 */
			_cancelEvent() {
				//触发取消回调
				this.$emit("cancelEvent")
			},
			_confirmEvent() {
				//触发成功回调
				this.$emit("confirmEvent");
			}
		}
	}
</script>

<style>
	.wx-mask {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.3);
	}

	.wx-dialog {
		position: fixed;
		z-index: 5000;
		width: 80%;
		max-width: 600rpx;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #FFFFFF;
		text-align: center;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.wx-dialog-title {
		font-size: 18px;
		padding: 15px 15px 5px;
	}

	.wx-dialog-content {
		padding: 15px 15px 5px;
		min-height: 40px;
		line-height: 1.3;
		word-wrap: break-word;
		word-break: break-all;
		color: #999;
	}

	.wx-dialog-footer {
		display: flex;
		align-items: center;
		position: relative;
		line-height: 45px;
	}

	.wx-dialog-footer::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-top: 1px solid #D5D5D6;
		color: #D5D5D6;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.wx-dialog-btn {
		display: block;
		-webkit-flex: 1;
		flex: 1;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		position: relative;
	}

	.wx-dialog-footer .wx-dialog-btn:nth-of-type(1) {
		color: #353535;
	}

	.wx-dialog-footer .wx-dialog-btn:nth-of-type(2) {
		color: #00a2ed;
	}

	.wx-dialog-footer .wx-dialog-btn:nth-of-type(2):after {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		width: 1px;
		bottom: 0;
		border-left: 1px solid #D5D5D6;
		color: #D5D5D6;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleX(0.5);
		transform: scaleX(0.5);
	}
</style>
