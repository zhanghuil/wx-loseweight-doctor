// 阻止按钮重复提交
import Vue from 'vue'
Vue.directive("button", {
	bind: function (el, binding, vnode) { // 每当指令绑定到元素上的时候，会立即执行这个bind函数，只执行一次
		function clickHandler(e) {
			// 这里判断点击的元素是否是本身，是本身，则返回
			if (el.contains(e.target)) {
				// $(el).attr("disabled", true);
				// setTimeout(() => {
				// 		$(el).attr("disabled", false);
				// }, 1500)
				// return false;
				el.disabled = true
				setTimeout(() => {
					el.disabled = false
				}, 2000)
				return false;
			}
			// 判断指令中是否绑定了函数    // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
			if (binding.expression) {
				binding.value(e);
			}
		}
		// 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
		el.__vueClickOutside__ = clickHandler;
		document.addEventListener('click', clickHandler);
	},
	unbind(el, binding) {   // 解除事件监听
		document.removeEventListener('click', el.__vueClickOutside__);
		delete el.__vueClickOutside__;
	},
})

// 防重复点击(指令实现)
/*Vue.directive('button', {
  inserted (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 3000)
      }
    })
  }
})*/

