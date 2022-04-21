import Header from "../components/Header"
import styles from '../styles/About.module.css'

const About = () => {
  return (
    <>
      <Header selectedIndex={2} />
      <div className={styles.container}>
        <h1>Sobre o healthyEnv</h1>
        <p>
          O <b>healthyEnv</b> é um projeto que surgiu como TCC do seu desenvolvedor, Diego Winter,
          graduando de Ciência da Computação pela Universidade Federal do Piauí (UFPI), sob orientação
          do Prof. Dr. Guilherme Amaral Avelino. A ideia inicial por trás do healthyEnv era
          de ser uma melhoria proposta para o TCC desenvolvido por Lucas Hiago Vilela, também
          aluno da instituição, o Metrics OSS. O Metrics OSS foi uma ferramenta desenvolvida por ele
          para construção de datasets com informações e métricas sobre projetos de software
          hospedados no GitHub. E com tudo que foi obtido desta ferramenta, foi feita uma análise
          que comparava determinado projeto com os demais do <i>dataset</i>.
        </p>
        <p>
          A melhoria que o healthyEnv proporciona por continuar o trabalho do Metrics OSS é
          a de classificar os projetos por semelhança, onde deve ser levado em consideração apenas
          valores de referência de projetos que sejam semelhantes ao que está sendo avaliado.
        </p>
        <h1>Licenças</h1>
        <div style={{ fontFamily: 'monospace' }}>
          <span>scikit-learn</span><br /><br />
          <span>
            BSD 3-Clause License<br /><br />

            Copyright (c) 2007-2021 The scikit-learn developers.<br />
            All rights reserved.<br /><br />

            Redistribution and use in source and binary forms, with or without<br />
            modification, are permitted provided that the following conditions are met:<br /><br />

            * Redistributions of source code must retain the above copyright notice, this<br />
            list of conditions and the following disclaimer.<br /><br />

            * Redistributions in binary form must reproduce the above copyright notice,<br />
            this list of conditions and the following disclaimer in the documentation<br />
            and/or other materials provided with the distribution.<br /><br />

            * Neither the name of the copyright holder nor the names of its<br />
            contributors may be used to endorse or promote products derived from<br />
            this software without specific prior written permission.<br /><br />

            THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS &quot;AS IS&quot;<br />
            AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE<br />
            IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE<br />
            DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE<br />
            FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL<br />
            DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR<br />
            SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER<br />
            CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,<br />
            OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE<br />
            OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.<br />
          </span>
          <br /><br />
          <span>Flask</span><br /><br />
          <span>
            BSD 3-Clause License<br /><br />

            Copyright 2010 Pallets<br /><br />

            Redistribution and use in source and binary forms, with or without<br />
            modification, are permitted provided that the following conditions are met:<br /><br />

            * Redistributions of source code must retain the above copyright notice, this<br />
            list of conditions and the following disclaimer.<br /><br />

            * Redistributions in binary form must reproduce the above copyright notice,<br />
            this list of conditions and the following disclaimer in the documentation<br />
            and/or other materials provided with the distribution.<br /><br />

            * Neither the name of the copyright holder nor the names of its<br />
            contributors may be used to endorse or promote products derived from<br />
            this software without specific prior written permission.<br /><br />

            THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS &quot;AS IS&quot;<br />
            AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE<br />
            IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE<br />
            DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE<br />
            FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL<br />
            DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR<br />
            SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER<br />
            CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,<br />
            OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE<br />
            OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.<br />
          </span>
          <br /><br />
          <span>Plotly.js</span><br /><br />
          <span>
            The MIT License (MIT)<br /><br />

            Copyright (c) 2021 Plotly, Inc<br /><br />

            Permission is hereby granted, free of charge, to any person obtaining a copy<br />
            of this software and associated documentation files (the &quot;Software&quot;), to deal<br />
            in the Software without restriction, including without limitation the rights<br />
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell<br />
            copies of the Software, and to permit persons to whom the Software is<br />
            furnished to do so, subject to the following conditions:<br /><br />

            The above copyright notice and this permission notice shall be included in<br />
            all copies or substantial portions of the Software.<br /><br />

            THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR<br />
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,<br />
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE<br />
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER<br />
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,<br />
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN<br />
            THE SOFTWARE.<br />
          </span>
          <br /><br />
          <span>Next.js</span><br /><br />
          <span>
            The MIT License (MIT)<br /><br />

            Copyright (c) 2022 Vercel, Inc.<br /><br />

            Permission is hereby granted, free of charge, to any person obtaining a copy<br />
            of this software and associated documentation files (the &quot;Software&quot;), to deal<br />
            in the Software without restriction, including without limitation the rights<br />
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell<br />
            copies of the Software, and to permit persons to whom the Software is<br />
            furnished to do so, subject to the following conditions:<br /><br />

            The above copyright notice and this permission notice shall be included in<br />
            all copies or substantial portions of the Software.<br /><br />

            THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR<br />
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,<br />
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE<br />
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER<br />
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,<br />
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN<br />
            THE SOFTWARE.<br />
          </span>
        </div>
      </div>
    </>
  )
}

export default About