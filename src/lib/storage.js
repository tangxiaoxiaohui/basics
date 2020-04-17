const Storage =  {};
Storage.get = function (key) {
	let data;
	try {
		data = JSON.parse(localStorage.getItem(key));
	}catch (e) {
		// todo 数据parse失败
		data = localStorage.getItem(key);
	}
	return data;
};
Storage.set = function (key, value) {
	localStorage.setItem(key, JSON.stringify(value));
};

export default Storage;
