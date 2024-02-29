const rlUI = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout
})
const {log} = console;
function addMinutesToTime_Runtime([time,minutes]) {
	let svard;
	if (time === "$T") {
		svard = new Date()*1 + (3 * 3600 * 1000);
	} else {
		svard = new Date().setUTCHours(parseInt(time.split(":")[0]));
		svard = new Date(new Date(svard).setUTCMinutes(parseInt(time.split(":")[1])));
	}
	svard = new Date(svard*1 + (minutes * 60 * 1000));
	log(`=> ${svard.getUTCHours()} часов ${svard.getUTCMinutes()} минут`);
}
function addDaysToDate_Runtime([date,days]) {
	let [day, month, year] = date.split(".");
	dat = new Date(new Date(`${year}-${month}-${day}`)*1 + (days * 86_400_000));
	log(`${dat.getDate()}.${dat.getUTCMonth()+1}.${dat.getUTCFullYear()}`);
}
function betweeninfyTimesRuntime([time1,time2]) { //time1 is 19:29, time2 is 20:21
	let [hour1, minute1] = time1.split(":");
	let [hour2, minute2] = time2.split(":");
	let date1 = new Date();
	date1 = new Date(date1.setUTCHours(hour1));
	date1 = new Date(date1.setUTCMinutes(minute1));
	let date2 = new Date();
	date2 = new Date(date2.setUTCHours(hour2));
	date2 = new Date(date2.setUTCMinutes(minute2));
	log(`${(date2.getUTCMinutes() - date1.getUTCMinutes()) < 0 ? (date2.getUTCHours() - date1.getUTCHours()) - 1 : (date2.getUTCHours() - date1.getUTCHours())} часов ${(date2.getUTCMinutes() - date1.getUTCMinutes()) < 0 ? 60 + (date2.getUTCMinutes() - date1.getUTCMinutes()): (date2.getUTCMinutes() - date1.getUTCMinutes())} минут`);
}
function betweeninfyDatesRuntime([date1,date2]) { //date1 is 03.01.2014, date2 is 09.11.2016
	let [day1, month1, year1] = date1.split(".");
	let [day2, month2, year2] = date2.split(".");
	let totaltime = new Date((new Date(`${year2}-${month2}-${day2}`).getTime()) - (new Date(`${year1}-${month1}-${day1}`).getTime()));
	log(`${totaltime.getUTCFullYear() - 1970} лет ${totaltime.getUTCMonth()} месяцев ${totaltime.getDate() - 3} дней`)
}
function help([cmd]) {
	switch (cmd) {
	case "amtt":
		log(`
Добавление определенного количества минут к времени.
amtt <ВРЕМЯ> <КОЛИЧЕСТВО МИНУТ>
amtt 10:29 10
			`);
		break;
	case "adtd":
		log(`
Добавление определенного количества дней к дате.
adtd <ДАТА> <КОЛИЧЕСТВО ДНЕЙ>
adtd 14.01.2015 2
			`);
		break;
	case "bt":
		log(`
Вычисление разницы между временами.
bt <ВРЕМЯ1> <ВРЕМЯ2>
bt 20:10 21:20
			`);
		break;
	case "bd":
		log(`
Вычисление разницы между датами.
bd <ДАТА1> <ДАТА2>
bd 10.02.2012 21.06.2021
			`);
		break;
	case "help":
		log(`
Вывод справки.
help
help
			`);
		break;
	case "q":
		log(`
Выход из программы.
q
q
			`);
		break;
	default:
		log(`
Все команды: amtt adtd bt bd q help
Набери help <КОМАНДА>, чтобы получить справку о <КОМАНДА>.
`)
}
}
log("Нужна помощь? Набери help!")
rlUI.setPrompt("Что делать? ")
rlUI.on("line",(action)=>{
	let runtime_options = action.split(" ");
	[cmd, ...args] = runtime_options;
	if (cmd === "amtt") {
		addMinutesToTime_Runtime(args)
	} else if (cmd === "adtd") {
		addDaysToDate_Runtime(args);
	} else if (cmd === "bt") {
		betweeninfyTimesRuntime(args);
	} else if (cmd === "bd") {
		betweeninfyDatesRuntime(args);
	} else if (cmd === "q") {
		process.exit();
	} else if (cmd === "help") {
		help(args)
	} else {
		log("Что?!");
	}
	rlUI.prompt();
})