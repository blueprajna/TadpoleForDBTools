var editorService={RDBinitEditor:function(e,t,r,i,o,n,s,d,a){},MONGODBinitEditor:function(e,t,r,i,o,n,s){},changeEditorStyle:function(e,t,r,i,o){},setFocus:function(){},setTheme:function(e){},setFontSize:function(e){},setWrap:function(e,t){},saveData:function(){},setTabSize:function(e){},getAllText:function(){},getSelectedText:function(e){},setSelectedText:function(){},insertText:function(e){},addText:function(e){},isBlockText:function(){},reNewText:function(e){},HELP_POPUP:"60",helpDialog:function(){},DIRTY_CHANGED:"1",SAVE:"15",EXECUTE_QUERY:"25",EXECUTE_ALL_QUERY:"26",EXECUTE_PLAN:"30",EXECUTE_FORMAT:"35",F4_DML_OPEN:"40",GENERATE_SELECT:"45"},isEdited=!1,varEditorType="TABLES",langTools=ace.require("ace/ext/language_tools"),editor=ace.edit("editor"),StatusBar=ace.require("ace/ext/statusbar").StatusBar,statusBar=new StatusBar(editor,document.getElementById("statusBar")),EditSession=ace.require("ace/edit_session").EditSession,UndoManager=ace.require("./undomanager").UndoManager;editor.resize(!0),editor.setShowPrintMargin(!1),editor.setHighlightActiveLine(!0),editor.setOptions({enableBasicAutocompletion:!0,enableSnippets:!0,enableLiveAutocompletion:!0}),editorService.RDBinitEditor=function(e,t,r,i,o,n,s,d,a){varEditorType=t;var c=new EditSession(i);try{if(c.setUndoManager(new UndoManager),c.setMode(e),c.on("change",function(){if(!isEdited){try{AceEditorBrowserHandler(editorService.DIRTY_CHANGED)}catch(e){console.log(e)}isEdited=!0}}),""!=r){var l=c.$mode.$highlightRules.$keywordList;null!=l&&(c.$mode.$highlightRules.$keywordList=l.concat(r.split("|")))}}catch(u){console.log(u)}try{editor.setTheme("ace/theme/"+o),editor.setFontSize(n+"px"),editor.renderer.setShowGutter("true"===a)}catch(u){console.log(u)}try{var g="true"===s;c.setUseWrapMode(g),g&&c.setWrapLimitRange(d,d)}catch(u){console.log(u)}editor.setSession(c),editor.focus()},editorService.MONGODBinitEditor=function(e,t,r,i,o,n,s){editorService.RDBinitEditor(e,"NONE","",t,r,i,o,n,s)},editorService.changeEditorStyle=function(e,t,r,i,o){editor.setTheme("ace/theme/"+e),editor.setFontSize(t+"px"),editor.renderer.setShowGutter("true"===o);var n="true"===r;session.setUseWrapMode(n),n&&session.setWrapLimitRange(i,i),editor.setSession(session)},ace.define("DynHighlightRules",[],function(e,t,r){var i=e("ace/lib/oop"),o=e("ace/mode/text_highlight_rules").TextHighlightRules,n=function(){this.setKeywords=function(e){this.keywordRule.onMatch=this.createKeywordMapper(e,"identifier")},this.keywordRule={regex:"\\w+",onMatch:function(){return"text"}},this.$rules={start:[{token:"string",start:'"',end:'"',next:[{token:"constant.language.escape.lsl",regex:/\\[tn"\\]/}]},this.keywordRule]},this.normalizeRules()};i.inherits(n,o),t.DynHighlightRules=n}),editorService.saveData=function(){isEdited=!1},editorService.setFocus=function(){editor.focus()};var shortcutErrMsg='Oops, an execution error has occured!\nEither click the "SQL" button of the tool bar, or open a new editor window.';editor.commands.addCommand({name:"save",bindKey:{win:"Ctrl-S",mac:"Command-S"},exec:function(e){try{var t=AceEditorBrowserHandler(editorService.SAVE,editorService.getAllText());t&&editorService.saveData()}catch(r){console.log(r),alert(shortcutErrMsg)}},readOnly:!1}),editorService.isBlockText=function(){return""!=editor.getSelectedText()?!0:!1},editor.commands.addCommand({name:"executeQuery",bindKey:{win:"Ctrl-Enter",mac:"Command-Enter"},exec:function(e){try{var t=editorService.getSelectedText(";");AceEditorBrowserHandler(editorService.EXECUTE_QUERY,t,editorService.isBlockText())}catch(r){console.log(r),alert(shortcutErrMsg)}},readOnly:!1}),editor.commands.addCommand({name:"executeObjectViewer",bindKey:{win:"F4",mac:"F4"},exec:function(e){try{var t=e.getSelectedText();if(""!=t)AceEditorBrowserHandler(editorService.F4_DML_OPEN,t);else{var r=e.session.getLine(e.getCursorPosition().row);if(""!=r){var i=r.substring(0,e.getCursorPosition().column),o=i.split(" "),n=r.substring(e.getCursorPosition().column),s=n.split(" "),d=o[o.length-1]+s[0];d=d.replace(";",""),AceEditorBrowserHandler(editorService.F4_DML_OPEN,d)}}}catch(a){console.log(a)}},readOnly:!1}),editor.commands.addCommand({name:"executeTableSelect",bindKey:{win:"Ctrl-I",mac:"Command-I"},exec:function(e){try{var t=e.getSelectedText();if(""!=t)AceEditorBrowserHandler(editorService.GENERATE_SELECT,t);else{var r=e.session.getLine(e.getCursorPosition().row);if(""!=r){var i=r.substring(0,e.getCursorPosition().column),o=i.split(" "),n=r.substring(e.getCursorPosition().column),s=n.split(" "),d=o[o.length-1]+s[0];d=d.replace(";",""),AceEditorBrowserHandler(editorService.GENERATE_SELECT,d)}}}catch(a){console.log(a)}},readOnly:!1}),editor.commands.addCommand({name:"executePlan",bindKey:{win:"Ctrl-E",mac:"Command-E"},exec:function(e){try{AceEditorBrowserHandler(editorService.EXECUTE_PLAN,editorService.getSelectedText(";"),editorService.isBlockText())}catch(t){console.log(t),alert(shortcutErrMsg)}},readOnly:!1}),editor.commands.addCommand({name:"format",bindKey:{win:"Ctrl-Shift-F",mac:"Command-Shift-F"},exec:function(e){try{var t=AceEditorBrowserHandler(editorService.EXECUTE_FORMAT,editorService.getAllText());e.setValue(t)}catch(r){console.log(r),alert(shortcutErrMsg)}},readOnly:!1}),editor.commands.addCommand({name:"changeLowCase",bindKey:{win:"Ctrl-Shift-Y",mac:"Command-Shift-Y"},exec:function(e){e.toLowerCase()},readOnly:!1}),editor.commands.addCommand({name:"changeUpperCase",bindKey:{win:"Ctrl-Shift-X",mac:"Command-Shift-X"},exec:function(e){e.toUpperCase()},readOnly:!1}),editor.commands.addCommand({name:"helpDialog",bindKey:{win:"Ctrl-Shift-L",mac:"Command-Shift-L"},exec:function(e){try{editorService.helpDialog()}catch(t){console.log(t)}},readOnly:!1}),editor.commands.addCommand({name:"cleagePage",bindKey:{win:"Ctrl-F7",mac:"Command-F7"},exec:function(e){e.setValue("")},readOnly:!1}),editorService.setTabSize=function(e){editor.getSession().setTabSize(e)},editorService.getAllText=function(){return editor.getValue()},editorService.setSelectedText=function(){var e=editorService.getSelectedText(";"),t=editor.getCursorPosition().row;editor.gotoLine(t-1),editor.find(e)},editorService.getSelectedText=function(e){var t=editor.getValue();if(""==t)return"";if("PROCEDURES"==varEditorType||"FUNCTIONS"==varEditorType||"TRIGGERS"==varEditorType){var r=editor.getSelectedText();return""!=r?r:t}try{var r=editor.getSelectedText();if(""!=r)return r;var i="",o=editor.session.getLine(editor.getCursorPosition().row);if(o.startsWith("--")||-1==o.lastIndexOf(e)?(i=findPreviousChar(editor.getCursorPosition().row-1,e),i+=o+"\n",i+=findNextCharacter(editor.getCursorPosition().row+1,e)):(i=findPreviousChar(editor.getCursorPosition().row-1,e),i+=o.substring(0,o.lastIndexOf(e))),""==i.trim()){var n=findPreviousLineText(editor.getCursorPosition().row,e);-1!==n&&(i=findPreviousChar(n-1,e),o=editor.session.getLine(n),i+=o.substring(0,o.lastIndexOf(e)))}return i}catch(s){console.log(s)}},findPreviousLineText=function(e,t){for(var r=e;r>=0;r--){var i=editor.session.getLine(r),o=i.lastIndexOf(t);if(-1!=o)return r}return-1},findPreviousChar=function(e,t){for(var r="",i=new Array,o=0,n=e;n>=0;n--){var s=editor.session.getLine(n);if(s.startsWith("--"))i[o]=s;else{var d=s.lastIndexOf(t);if(-1!=d){i[o]=s.substring(d+1);break}i[o]=s}o++}for(n=0;n<i.length;n++)r+=i[i.length-n-1]+"\n";return r},findNextCharacter=function(e,t){for(var r="",i=editor.session.getLength(),o=new Array,n=0,s=e;i>s;s++){var d=editor.session.getLine(s);if(d.startsWith("--"))o[n]=d;else{var a=d.lastIndexOf(t);if(-1!=a){o[n]=d.substring(0,a+1);break}o[n]=d}n++}for(s=0;s<o.length;s++)r+=o[s]+"\n";return r},editorService.insertText=function(e){try{editor.insert(e),editor.focus()}catch(t){console.log(t)}},editorService.addText=function(e){try{""==editor.getValue()?editor.insert(e):(editor.gotoLine(editor.session.getLength()+1),editor.insert("\n"+e)),editor.focus()}catch(t){console.log(t)}},editorService.reNewText=function(e){editor.setValue(""),editor.insert(e)},editorService.helpDialog=function(){try{AceEditorBrowserHandler(editorService.HELP_POPUP)}catch(e){console.log(e)}};