function default_for(t,i){return"undefined"!=typeof t?t:i}var App={initialize:function(){this.host=window.location.host,this.set_body_class(),this.toggle_images(),this.link_out(),this.init_huboard(),this.init_jira()},set_body_class:function(){$("body").addClass(this.host.substring(0,this.host.indexOf(".com")))},toggle_images:function(){$(".comment-body img:not('.toggled'):not('.emoji')").hide().addClass("toggled").before($("<a href='#' style='display:block;'>Toggle image</a>").click(function(){return $(this).next().toggle(),!1}))},link_out:function(t){t=default_for(t,!1),$(".comment-body a").filter(function(){return t?!0:$(this).not(".issue-link")}).attr("target","_blank")},init_huboard:function(){$(document).on("DOMNodeInserted",function(t){$(t.target).find(".comment-body").length>0&&(App.toggle_images(),App.link_out(!0)),$(t.target).find(".card").length&&($(".column:not(:first) .title:contains('[?]')").closest(".card").css({borderWidth:"2px",borderColor:"red"}),$(".column:not(:first) .title").filter(function(){return!$(this).text().match(/\[.*\]/)}).closest(".card").css({borderWidth:"2px",borderColor:"red"}))})},init_jira:function(){$(document).on("click",".ghx-key a",function(t){window.location=$(this).prop("href"),t.preventDefault()}),$(".ghx-detail-close span").click()}};$(function(){App.initialize()});