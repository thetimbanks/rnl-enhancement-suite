$(function(){function e(e){e.stopPropagation(),e.preventDefault();var r=e.originalEvent.dataTransfer.files,o=0;a.text("Processing ("+r.length+")"),$.each(r,function(e,i){var p=i.name.lastIndexOf("."),s=i.name;-1!=p&&(s=i.name.substr(0,p)+"-"+Date.now()+i.name.substr(p));var d={Key:s,ContentType:i.type,Body:i,ACL:"public-read"};t.putObject(d,function(e){var p=n.find("textarea");e?a.text("ERROR!"):(p.val(p.val()+"\n ["+i.name+"](https://s3.amazonaws.com/"+t.config.params.Bucket+"/"+encodeURIComponent(s)+")"),++o===r.length&&(a.text("Uploaded!"),setTimeout(function(){a.text("")},2e3)))})})}var n=$(".github .write-content");if(n){n.append($("<div id='rnl-uploader-drop' class='rnl-uploader-drop'>Drop files here <div class='rnl-uploader-message'></div></div>"));var t=new AWS.S3({params:{Bucket:"rnl-enhancement-suite"}}),a=$(".rnl-uploader-message"),r=$("#rnl-uploader-drop");r&&(r.on("dragenter dragexit dragover",function(e){e.stopPropagation(),e.preventDefault()}),r.on("drop",e))}});