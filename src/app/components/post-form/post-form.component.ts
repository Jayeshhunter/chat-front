import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from './../../services/post.service';
import io from 'socket.io-client';

const URL = 'http://localhost:3000/api/chatapp/upload-image';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  socketHost: any;
  socket: any;
  postForm: FormGroup;
  constructor(private fb: FormBuilder, private postService: PostService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.postForm = this.fb.group({
      post: ['', Validators.required],
    });
  }

  submitPost() {
    this.postService.addPost(this.postForm.value).subscribe((data) => {
      this.socket.emit('refresh', {});
      this.postForm.reset();
    });
  }
}
