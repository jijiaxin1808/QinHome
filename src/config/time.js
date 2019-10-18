function   getDate( time ) {
	const date = new Date( time );
	const min = date.getMinutes();
	const sec = date.getSeconds;
	const nowDate =new  Date();
	const year = date.getFullYear();
	const mouth = date.getMonth();
	const day = date.getDay();
	const hour = date.getHours();
	return `${year}/${mouth}/${day}`
}

export default getDate;