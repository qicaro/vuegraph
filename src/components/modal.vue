<template>
	<div v-if="showModal">
		<div class="modal-bg">
			<div class="modal-span vertical-center">
				<div class="log-message">
					<h3>Mensagem</h3>
					{{ logError.message }}
				</div>
				<div class="log-stacktrace">
					<h3>StackTrace</h3>
					{{ logError.stackTrace }}
				</div>
				<div class="log-fixpoint">
					<h3>Possiveis pontos de reparo</h3>
					<div v-for="item in logError.fixPoints">
						<div class='fixpoints-item'>
							Arquivo: {{ item.file }}
						</div>
						<div class='fixpoints-item'>
							Tipo: {{ item.type }}
						</div>
						<div class='fixpoints-item'>
							Método: {{ item.method }}
						</div>
						<div class='fixpoints-item'>
							Linha: {{ item.line }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<button class="close-button" @click="showModal = false">FECHAR</button>
	</div>
</template>

<script>
export default {
	props: [
		'logError', 'showModal'
	],
	data() {
		return {
			
		}
	}
}
</script>

<style>
.modal-bg{
	background-color: rgba(10,10,10,0.7);
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
}

.modal-span{
	padding: 10px;
	background-color: white;
	margin: auto;
	max-height: 70%;
	overflow: auto;
}


.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.close-button{
	background-color: inherit;
	border: none;
	position: fixed;
	color: white;
	font-size: 20px;
	right: 20px;
	top: 20px;
}
</style>
