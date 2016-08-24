var appData = {
    child1 : ''//Global variable
};
//Declare framework7 instance.
var myApp = new Framework7();
var $$ = Dom7;

var child1 = Vue.extend({
    props: ['pmsg'],//From parent component variable.
    template: '#child-templateA',//template id
    data: function() {
        return {
            msg: appData.child1 //Get state from global store.
        }
    },
    methods: {
        notify: function() {
            //Filter input element value space.
            if (this.msg.trim()) {
                //Send event to parent component.
                this.$dispatch('child-msg', this.msg);
                appData.child1 = this.msg;//Update global store
            }//fi
        }//End of notify().
    }
});
var child2 = Vue.extend({
    props: ['pmsg'],//From parent component variable.
    template: '#child-templateB',//template id
    data: function() {
        return {
            msg: ''
        }
    }
});
// 初始化父组件
// 将收到消息时将事件推入一个数组
var parent = new Vue({
  el: '#events-example',
  data: {
    currentView: 'page1',
    pmsg: appData.child1
  },
  components: {
    page1: child1,
    page2: child2
  },
  // 在创建实例时 `events` 选项简单地调用 `$on`
  events: {
    'child-msg': function (msg) {
      // 事件回调内的 `this` 自动绑定到注册它的实例上
      this.messages.push(msg);
      }
    },
  methods: {
	'switchPage' : function () {
		this.currentView = event.target.getAttribute('data-target');
	},
    'login': function () {
        myApp.modalLogin('Authentication required', function (username, password) {
            myApp.alert('Thank you! Username: ' + username + ', Password: ' + password);
        });
    },
    'password': function() {
        myApp.modalPassword('You password please:', function (password) {
            myApp.alert('Thank you! Your password is: ' + password);
        });
    }
  }
});
