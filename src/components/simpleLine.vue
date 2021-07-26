<template>
	<div>
		<div class="select-number">
			Mostrar Top: 
			<select @change="onChange($event)" v-model="topSelected">
			  <option v-for="option in optionsSelect" v-bind:value="option.value">
				{{ option.text }}
			  </option>
			</select>
		</div>
		<JSCharting :options="options" class="simpleLine"></JSCharting>
		<modal :logError="logError" :showModal="showModal"></modal>
	</div>
</template>



<script>
import JSCharting from 'jscharting-vue';
import modal from './modal.vue';

const axios = require("axios");

export default {
	data() {
		return {
			topSelected: 10,
			logError: {
				message: "ola mundo",
				stackTrace: "teste teste teste"
			},
			showModal: false,
			options: carregaChart(),
			optionsSelect: [
				{
					text: "10",
					value: 10
				},
				{
					text: "20",
					value: 20
				}, 
				{
					text: "50",
					value: 50
				}
			]
		};
	},
	components: {
		JSCharting,
		modal
	},
	mounted() {
		axios
			.get("http://localhost:5000/log/bynumber?show=10")
			.then((response) => {
				this.options = carregaChart(response.data, 
										   (logError) => {
												this.logError = logError;
												this.showModal = true;
										   });
				console.log(response)
				});
	},
	methods: {
		onChange(event) {
			axios
			.get("http://localhost:5000/log/bynumber?show="+this.topSelected)
			.then((response) => {
				this.options = carregaChart(response.data, 
										   (logError) => {
												this.logError = logError;
												this.showModal = true;
										   });
				console.log(response)
			});
		}
	}
};

function carregaChart(LogChartItems = [], setModal = (text) => {}){
	{
		let options = {
			type: "column", 
			legend_position: 'bottom',
			series: [
			]
		}
		for(var i = 0; i < LogChartItems.length; i++){
			options.series[i] = {
				legendEntry: { name: '%name' },
				name: LogChartItems[i].name,
				points: [
					{
						events: {
							click: function(e) {
								console.log(this);
								let index = this.id.split(":")[1];
								let clicked = LogChartItems[index];
								axios
									.get("http://localhost:5000/log/fixpoint/"+clicked.id)
									.then((response) => {
										let logError = {
											message: clicked.message,
											stackTrace: clicked.stackTrace,
											fixPoints: response.data
										}
										setModal(logError);
									});
							}
						},
						id: "index:" + i,
						name: LogChartItems[i].points[0].name,
						y: LogChartItems[i].points[0].y
					}
				]
			}
		}
		console.log(options)
		return options;
	}
}

</script>

<style>
.simpleLine {
	height: 400px;
	width: 100%;
}

.select-number{
	margin-bottom: 50px;
}
</style>
