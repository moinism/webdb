/*
 Copyright 2013 Moin Uddin

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
var db={shortName:null,version:0,displayName:null,maxSize:65536,b_db:"",qry:"",result:"",error:"",onSuccess:function(b,a){alert("Called on query success.")},onError:function(a,b){alert("Called on query error")},throwError:function(a){console.error("Error in DB: "+a);this.error=a},errHandle:function(a,b){this.throwError("Transaction Error: "+b.message+", Error Code: "+b.code+" ");this.onError(a,b)},open:function(d,b,a,c){if(d!=null&&b!=0&&a!=null){this.b_db=openDatabase(d,b,a,c);return this.b_db}else{this.throwError("shortName must be a valid value, version must be a float, displayName must be a valid value.")}},connect:function(){this.result=this.open(this.shortName,this.version,this.displayName,this.maxSize);if(this.result!=undefined){console.warn("Connected to "+this.displayName)}},run:function(a,c){var b=a.split(" ")[0];c=(b=="INSERT"||b=="DELETE"||b=="SELECT")?c:null;if((b=="INSERT"||b=="DELETE"||b=="SELECT")&&c!=null){this.execute(this.b_db,a,c)}else{if((b=="INSERT"||b=="DELETE"||b=="SELECT")&&c==null){this.throwError("Method 'run' called with INSERT/DELETE/SELECT query must have a second paramater having relative values. More on http://moin.im/plugins/webdb/index.html#run")}}},execute:function(a,b,c){a.transaction(function(d){d.executeSql(b,c,db.onSuccess,db.errHandle)})}};(function(b,a,c){b.webdb=function(e,f){var h={shortName:"MyDB",version:"1.0",displayName:"My DB Name",maxSize:65336};var g={query:null,values:null,onSuccess:function(i,j){alert("Success")},onError:function(i,j){alert("Error!")}};__lastCon=null,__open=function(l,j,i,k){return __lastCon=a.openDatabase(l,j,i,k)},__errorHadle=function(i){console.error("Error in WebDB: "+i)};var d=function(j){var i=__open(j.shortName,j.version,j.displayName,j.maxSize);var k=function(l){var m=l.query.split(" ")[0];if(l.query!=null||l.query!=c){i=(i!=null||i!=c)?i:(__lastCon!=null||__lastCon!=c)?__lastCon:null;if(i!=null){i.transaction(function(n){try{n.executeSql(l.query,l.values,l.onSuccess,function(p,q){__errorHadle("Transaction Error: "+q.message+", Error Code: "+q.code+" ");l.onError(p,q)})}catch(o){__errorHadle(o+" Read more about it on http://moin.im/plugins/webdb/index.html#mm")}})}else{__errorHadle("Connection is not valid")}}else{__errorHadle("Query must be valid for execution")}return false};return{run:k}};if(typeof e=="object"&&typeof f=="object"){d(e).run(f)}return{connect:d}}})(jQuery,window);