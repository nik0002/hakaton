"use strict";!function(){function t(t,n){var r=new XMLHttpRequest;r.open("POST","/api/loadsitesstat/"+t,!0),r.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),r.onload=function(){},r.onerror=function(){},r.send("h="+e+"&t="+n)}if(performance||performance.timing)try{var e=function(){for(var t="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;25>n;n++)t+=e.charAt(Math.floor(Math.random()*e.length));return t+"_"+Date.now()}();if(t("add",performance.timing.responseStart),performance.timing.loadEventStart)return void t("resolve",performance.timing.loadEventStart);window.addEventListener("load",(function(){t("resolve",performance.timing.loadEventStart)}))}catch(t){}}();