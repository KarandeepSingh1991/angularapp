MyApp.controller("listController",['$scope','$http','$firebaseArray','$location','$routeParams','$window','$cookieStore','$rootScope',function($scope,$http,$firebaseArray,$location,$routeParams,$window,$cookieStore,$rootScope){
    var data = new Firebase('https://addremove.firebaseio.com');
    $scope.whichprod = $routeParams.prodid;
    $scope.view='view2';
    var editedindex=0;
    $scope.currency="₹";
    $scope.toggleviewprod=true;
    $scope.presentview='view1';
    $scope.view2id = $routeParams.view2prodid;
    $scope.wholedata = $firebaseArray(data);
    $scope.optionsselected = ["1", "2", "3"];
    $scope.corosel=true;
    $scope.newobject=[];
    
    $scope.alertFilename=function()
            {
                var thefile = document.getElementById('thefile');
                console.log("hii",thefile.value);
                var filename = thefile.value.replace(/^.*\\/, "");
        	   $scope.img="images/"+filename;
        /*if(!==undefined){
            document.getElementById("myspan").innerHTML="GREAT!!! Image Uploaded";
    }else{
         $scope.img="images/"+filename;
        document.getElementById("myspan").innerHTML="Kindly Choose Image File";
        
    }*/
               
            }
    
    function init()
    {
        if(!$rootScope.person)
        $rootScope.person = prompt("Please enter your name");
        $cookieStore.put("Name",$rootScope.person);
    }
    init();
    $scope.view2Data=function(selecteddata,ind)
    {
            $scope.selectedtitle=selecteddata.title;
            console.log(selecteddata.title);
            $scope.selectedduration=selecteddata.duration;
            $scope.selectedprice=selecteddata.price
            $scope.selectedimage=selecteddata.image;
            $rootScope.name=$cookieStore.get("Name");
            $scope.toggleviewprod=false;
            $scope.toggleshow=true;
            console.log($scope.toggleviewprod);
            scroll(0,0);
    }
    
        $scope.switchview=function()
        {
            if($scope.view=='view1')
            {
            $location.url('/' + $scope.view);
            $scope.corosel=true;
            $scope.presentview='view1'
            $scope.view="view2";
            }else
            {
                $location.url('/' + $scope.view);
                $scope.corosel=false;
                $scope.presentview='view2'
                $scope.view="view1";
            }
        }
        
        $scope.ViewProducts=function()
        {
           $scope.toggleviewprod=true;
           $scope.toggleshow=false;
        }
    
   

   /* $http.get('json/details.json').success(function(response){
        $scope.jsondata=response;
        })*/
        
 
        $scope.edit=function(data,index)
        {
            console.log("edit");
            $scope.toggle=true;
            $scope.togglecart=false;
            $scope.title=data.title;
            $scope.duration=data.duration;
            $scope.price=data.price;
            $scope.id=data.$id;
            $scope.img=data.image;
            indexval=index;
            dataval=data;
            editedindex=index; 
        }
 
        $scope.show=function()
        {
            $scope.toggle=true;
            $scope.togglecart=false;
            document.getElementById("Name").value=" ";
            document.getElementById("Duration").value=" ";
            document.getElementById("Price").value=" ";
        }
 
        $scope.delete=function(data1)
        {
            /*console.log(index);
            $scope.wholedata.splice(index,1);*/
            $scope.wholedata.$remove(data1);
        }
 
        $scope.add=function()
        {
            /*$scope.wholedata = $scope.wholedata.concat([
            {title : $scope.title,duration:$scope.duration}
            ]);*/
            /*$scope.wholedata.push({title:$scope.title,duration:$scope.duration,price:$scope.price});*/
            var flag=0;
            for(i=0;i<$scope.wholedata.length;i++)
            {
                if($scope.wholedata[i].title==$scope.title &&        $scope.wholedata[i].duration==$scope.duration && $scope.wholedata[i].price==$scope.price &&
                $scope.wholedata[i].image==$scope.img)
                    
                {
                flag=1;
                alert("Movie already added");
                }
            }
                if(flag==0)
                    {               data.push({title:$scope.title,duration:$scope.duration,price:$scope.price,image:$scope.img});
                    }
            }
        
        $scope.uploadFile=function(){
            
           console.log($scope.file.name);
        }
       
     
            /*$scope.editNew=function(data,index){
            newobj={title:$scope.title,duration:$scope.duration,price:$scope.price};
            for(i=0;i<$scope.wholedata.length;i++){
            console.log($scope.wholedata[i].id);
            if($scope.wholedata[i].id==indexval)
            {
                console.log($scope.wholedata[i+1]);
                $scope.wholedata[i+1]=newobj;
                $scope.wholedata.$save(newobj);
              
          
            }
            }}*/
     
            //firebase
            $scope.editNew=function()
            { 
                var id=$scope.id;
                var record=$scope.wholedata.$getRecord(id);
                record.title=$scope.title;
                record.duration=$scope.duration;
                record.price=$scope.price;
                record.image=$scope.img;
                $scope.wholedata.$save(record);
      
         
            //for array
            /*var obj={'title':$scope.title,'duration':$scope.duration,'price':$scope.price};
            $scope.wholedata[editedindex]=obj; 
            $scope.toggle=false;*/
            }
     
            $scope.addcart=function(data)
            {
                $scope.toggle=false;
                $scope.togglecart=true;
                var flag=0;
                for(i=0;i<$scope.newobject.length;i++)
                {
                if($scope.newobject[i].title==data.title)
                    {
                    alert("Movie already added in the cart");
                    flag=1;
                    }
                }       
                if(flag==0)
                {
                    $scope.title=data.title;
                    $scope.price=data.price;
                    $scope.id=data.$id;
                    $scope.quantity=0;
                    angular.extend(data,{'quantity':0});
                    $scope.newobject.push(data);
                 }  
                }
      
                $scope.quantchange=function(obj,index)
                {
                    $scope.quantity=obj.quantity;
                    if($scope.quantity==1)
                        {
                            $scope.amount=obj.price*obj.quantity;
                        }
                    var id=$scope.id;
                    var obj1={'title':obj.title,'price':obj.price,'quantity':obj.quantity,'amount':obj.price*obj.quantity,};
                    $scope.newobject[index]=obj1;
                     sum=0;
                    for(i=0;i<$scope.newobject.length;i++)
                    {
                    console.log($scope.newobject[i].amount);
                    sum=$scope.newobject[i].amount+ sum;
                    }
                    $scope.total=sum;
                }
 
                $scope.remove=function(newobjects,index)
                {
                /*console.log(index);*/
                /*$scope.wholedata.splice(index,1);*/
                $scope.newobject.splice(index,1);
                $scope.total=$scope.total-newobjects.amount;
                }
            }]);
