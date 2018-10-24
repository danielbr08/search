//require is Node.js global function that allows you to extract contents from module.exports object inside some file.
const path = require('path');
const fs = require('fs');
const dirPath = path.resolve("")// Get current fullpath

var ext = process.argv[2];// Get first parameter
const exp = process.argv[3];// Get second parameter

function findFilesNest(dir, ext, exp) {
	if( typeof ext === 'undefined' || typeof exp === 'undefined' ){// No input case
		console.log('USAGE: node search [EXT] [TEXT]');
		return;
	}
	ext = "." + ext;
    const reqFiles = getReqFiles(dir, ext,exp);// Get only files with suffix ext(parameter) 
	if(reqFiles.length == 0){
		console.log("No file was found!");}
	else{
		for(var i in reqFiles)
			console.log(reqFiles[i]);
	}	
}

function getReqFiles(dir,ext,exp) {// Get all files with extension ext(parameter) 
    var files = [];//local list
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);// Will be dir/file
        const stat = fs.lstatSync(filePath);
        if (stat.isDirectory())// Get only the files. If directory, we take all the files in the directory and sub directories.
			files = files.concat(getReqFiles(filePath, ext, exp));// Append the nested files
		else if( (path.extname(file) === ext) && isExpInFile(file,exp) )// If required extension      
			files.push(filePath);
    });
    return files;
}

function isExpInFile(file,exp){
	const fileContent = fs.readFileSync(file);// Get the file content
	const regex = new RegExp(exp);//Find a match of a word
    if (regex.test(fileContent)) {
		return true;
    }
	return false;	
}

findFilesNest(dirPath, ext, exp)