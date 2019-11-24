import React, { Component } from 'react';

import Logo from '../components/Logo';
import LogoJGB from '../components/LogoJGB';

export default class AboutScreen extends Component {
  render() {
    return (
      <div className='react-transition flip-in-x' style={{
        paddingTop: 150,
        textAlign: 'center',
      }}>
        <Logo />
        <p>
          MP3 Pam is a free entertainment platform for sharing all kinds of audios. <br />
          Music, Podcast, and even Ad. You name it.
                </p>

        <p>
          <small>
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE. <a style={{ color: 'white' }} href="https://opensource.org/licenses/MIT" target="_blank">License MIT</a>
          </small>
        </p>

        <p><small>Version 1.0.0</small></p>

        <p>&copy; 2019</p>

        <LogoJGB />
      </div >
    );
  }
}