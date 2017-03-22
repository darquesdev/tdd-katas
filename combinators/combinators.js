var expect = require('chai').expect;

describe("the power of combinators", function() {

  function validate(email){
      if (!email || email.indexOf('@') < 0){
         throw new Error('invalid email');
      }
  }

  function tryTo(fn){
    return function(email){
        try{
          fn(email);
        }
        catch(e){
          console.log(e);
          //throw e;
        }
    };
  }

  it("can be used as a decorator to extend behavior", function() {
      //uncomment the following line to see the test fail.
      //validate('david@david'); 
      var decorated = tryTo(validate);

      decorated('wrong email');
  });

//////////////////////////////////////////////////////////////

  function calculator(){
    return {
       complexStuff: function(arg1, arg2){
          return arg1 + arg2;
       }
    };
  }

  function proxy(obj, functionName, interceptedData){
      var aProxy = proxyFor(obj[functionName], interceptedData);
      return Object.assign({}, obj, {[functionName]: aProxy});
  }

  function proxyFor(fn, interceptedData){
      /* implement this */
      return function(arg1, arg2) {
        interceptedData.arg1 = arg1;
        interceptedData.arg2 = arg2;
        return fn(arg1, arg2);
      }
  }

  it("can be used as a proxy for debugging purposes", function() {
      //implement the function above to make the test pass
      var data = {};
      var calc = proxy(calculator(), 'complexStuff', data);
      
      var result = calc.complexStuff(7,9);

      expect(data.arg1).eql(7);
      expect(data.arg2).eql(9);
      expect(result).eql(16);
  });

//////////////////////////////////////////////////////////////

  function ajaxClient(){
      var serverUrl = "http://example/api";
      return {
        get: function(data){/*...*/},
        post:function(data){/*...*/},
        put: function(data){/*...*/},
        del: function(data){/*...*/}
      };
  }

  function save(user, ajaxClient){
      if (user){
         ajaxClient.put(user);  
      }
      else {
         throw new Error('invalid user');
      }
  }
  function hideClientFromSaveCallers(ajaxClient){
      /* implement this */
      return function(user){
        save(user, ajaxClient);
      }
  }

  it("can be used to inject hidden dependencies", function() {
      // implement the function above to make this test pass
      var client = ajaxClient();
      var clientWasCalled = false;
      client.put = function(){ // spy function
        clientWasCalled = true;
      }
      var user = {name:'bob'};
      var saveFacade = hideClientFromSaveCallers(client);
      
      saveFacade(user);

      expect(clientWasCalled).eql(true);
  });

//////////////////////////////////////////////////////////////

  function hideClientFromCallers(fn, ajaxClient){
      /* implement this */
      return function(user){
        return fn(user, ajaxClient)

      }
  }

  it("can combine any function", function() {
      // implement the function above to make this test pass
      var client = ajaxClient();
      var clientWasCalled = false;
      client.put = function(){ // spy function
        clientWasCalled = true;
      }
      var user = {name:'bob'};
      var saveFacade = hideClientFromCallers(save, client);
      
      saveFacade(user);

      expect(clientWasCalled).eql(true);
  });

//////////////////////////////////////////////////////////////

  function userService(ajaxClient){
    // you should not change this constructor function
    return {
      getUserByName: function(name){
         var users = ajaxClient.get('/users');
         return users.filter(function(current){
              return current.name === name;
         })[0];
      }
    };
  }
  function setupStub(obj, functionName, returnValue){
      // the easiest way to stub out a function within 
      // an object is to assign a new one to it
      obj[functionName] = function(){
          return returnValue;
      };
  }
  function userServiceWith(stubUsers){
      /* implement this */
  }

  it("can simplify the use of test stubs", function() {
      var createUserService = userServiceWith([
        {name: 'carlos'},
        {name: 'david'}
      ]);

      var expectedUser = createUserService()
                          .getUserByName('carlos');
      expect(expectedUser.name).eql('carlos');
  });

//////////////////////////////////////////////////////////////

  function actionCreator(){
      return function(dispatch){
          dispatch({
              type: 'SomeAction',
              data: {}
          })
      };
  }
  function connect(action){
      return {
          mapActionToProps: function (dispatch){
             return bindActionCreators(action, dispatch);
          }
      };
  }
  function bindActionCreators(action, dispatch){
      return function(){
          dispatch(action());
      }
  }

  it("can be hard to follow when combinators are combined", function() {
      /* TODO: consume the action */
  });



});

